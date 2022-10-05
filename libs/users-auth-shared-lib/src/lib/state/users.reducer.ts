/* eslint-disable @typescript-eslint/no-unused-vars */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/user';

import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

//Create Own state
export interface UsersState {
    user: User;
    isAuthenticated: boolean;
}

export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState: UsersState = {
    user: null,
    isAuthenticated: false
};

const usersReducer = createReducer(
    initialUsersState,
    on(UsersActions.buildUserSession, (state) => ({ ...state })),
    on(UsersActions.buildUserSessionSuccess, (state, action) => ({
        ...state,
        user: action.user,
        isAuthenticated: true
    })),
    on(UsersActions.buildUserSessionFailed, (state, action) => ({
        ...state,
        user: null,
        isAuthenticated: false
    }))
);

export function reducer(state: UsersState | undefined, action: Action) {
    return usersReducer(state, action);
}









//ORIGINAL CODE

// export const initialUsersState: UsersState = usersAdapter.getInitialState({

//   loaded: false,
// });

// const reducer = createReducer(
//   initialUsersState,
//   on(UsersActions.initUsers, (state) => ({
//     ...state,
//     loaded: false,
//     error: null,
//   })),
//   on(UsersActions.loadUsersSuccess, (state, { users }) =>
//     usersAdapter.setAll(users, { ...state, loaded: true })
//   ),
//   on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error }))
// );

// export function usersReducer(state: UsersState | undefined, action: Action) {
//   return reducer(state, action);
// }
