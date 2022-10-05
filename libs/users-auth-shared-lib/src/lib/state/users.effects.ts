/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import {concatMap, map} from 'rxjs/operators'
import { LocalStorageService } from '../services/local-storage.service';
import { of, catchError } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
  //Created our own Effect

  buildUserSession$ = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.buildUserSession),
    concatMap(() => {
      if (this.localStorageService.isValidToken()) {
        const userId = this.localStorageService.getUserIdFromToken();
        if (userId) {
          return this.usersService.getUser(userId).pipe(
            map((user) => {
              return UsersActions.buildUserSessionSuccess({user: user})
            }),
            catchError(() => of(UsersActions.buildUserSessionFailed()))
          );
        } else {
          return of(UsersActions.buildUserSessionFailed())
        }

      } else {
        return of(UsersActions.buildUserSessionFailed())
      }
    })
  ))

  constructor(private readonly actions$: Actions, private localStorageService: LocalStorageService, private usersService: UsersService) {}
}




//Old Code after "export class UsersEffect" {

//   init$ = createEffect(() =>
//   this.actions$.pipe(
//     ofType(UsersActions.initUsers),
//     fetch({
//       run: (action) => {
//         // Your custom service 'load' logic goes here. For now just return a success action...
//         return UsersActions.loadUsersSuccess({ users: [] });
//       },
//       onError: (action, error) => {
//         console.error('Error', error);
//         return UsersActions.loadUsersFailure({ error });
//       },
//     })
//   )
// );
// }