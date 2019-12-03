import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';
import { Inject, Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ProviderService } from './provider.service';
import { Provider } from '../model/provider';
import { ClientService } from './client.service';
import { Client } from '../model/client';

const VALUE_CHECK = 'checked';
const PROVIDER_ID = 'providerId';
const CLIENT_ID = 'clientId';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  checkboxValue = false;
  provider = new Provider();
  client = new Client();

  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: "esthebam.auth0.com",
      client_id: "1bzI6ingMiNp4n9Z9l3qBBVfjcEGB5Aa",
      redirect_uri: `${window.location.origin}`
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;

  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private router: Router, private providerService: ProviderService, private clientService: ClientService) { }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: `${window.location.origin}`,
        appState: { target: redirectPath }
      });
    });
  }

  handleAuthCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string; // Path to redirect to after login processsed
      const authComplete$ = this.handleRedirectCallback$.pipe(
        // Have client, now call method to handle auth callback redirect
        tap(cbRes => {
          // Get and set target redirect route from callback results
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
        }),
        concatMap(() => {
          // Redirect callback complete; get user and login status
          return combineLatest([
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );
      // Subscribe to authentication completion observable
      // Response will be an array of user and login status
      authComplete$.subscribe(([user, loggedIn]) => {
        // Redirect to target route after callback processing
        if(this.storage.get(VALUE_CHECK)) {
          this.providerService.getProviderByMail(user.email).subscribe(data => {
            this.storage.set(PROVIDER_ID, data);
          }, error => {
            this.provider.name = user.given_name;
            this.provider.mail = user.email;
            this.provider.type = 'Provider';
            this.providerService.createProviderForLogin(this.provider).subscribe(data => {
              this.storage.set(PROVIDER_ID, data.provider.id);
            }, error => console.log(error));
          });
        } else {
          this.clientService.getClientByMail(user.email).subscribe(data => {
            this.storage.set(CLIENT_ID, data);
          }, error => {
            this.client.firstName = user.given_name;
            this.client.lastName = user.family_name;
            this.client.mail = user.email;
            this.client.type = 'Client';
            this.clientService.createClientForLogin(this.client).subscribe(data => {
              this.storage.set(CLIENT_ID, data.client.id);
            }, error => console.log(error));
          });
        }
        this.router.navigate([targetRoute]);
      });
    }
  }

  logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: "1bzI6ingMiNp4n9Z9l3qBBVfjcEGB5Aa",
        returnTo: `${window.location.origin}`
      });
    });
    this.storage.remove(VALUE_CHECK);
    this.storage.remove(PROVIDER_ID);
    this.storage.remove(CLIENT_ID);
  }

  newFunction() {
    if(this.checkboxValue) {
      this.storage.set(VALUE_CHECK, this.checkboxValue);
    }
    else {
      this.storage.remove(VALUE_CHECK);
    }
  }

}