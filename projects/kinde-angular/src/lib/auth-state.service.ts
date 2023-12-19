import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, ReplaySubject, distinctUntilChanged, switchMap, defer, shareReplay, tap } from "rxjs";
import { KindeClient } from "./interfaces/kinde-client.interface";
import { factoryToken } from "./kinde-client-factory.service";

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  private isLoadingSubject$ = new BehaviorSubject<boolean>(true);
  private accessToken$ = new ReplaySubject<string>(1);

  isLoading$ = this.isLoadingSubject$.asObservable();
  isAuthenticatedStream$ = this.isLoading$.pipe(
    filter(isLoading => {
      console.log('filter', isLoading);
      return !isLoading;
    }),
    distinctUntilChanged(),
    switchMap(() =>
      defer(() => this.kindeClient.isAuthenticated())
    )
  );
  isAuthenticated$ = this.isAuthenticatedStream$.pipe(
    tap(isAuthenticated => console.log('la', isAuthenticated)),
    distinctUntilChanged(),
    shareReplay(1)
  )
  constructor(@Inject(factoryToken) private kindeClient: KindeClient) {
  }

  setIsLoading(isLoading: boolean) {
    this.isLoadingSubject$.next(isLoading);
  }

  setAccessToken(accessToken: string) {
    this.accessToken$.next(accessToken);
  }
}
