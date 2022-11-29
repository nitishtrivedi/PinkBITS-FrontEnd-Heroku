import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { Login2Component } from './pages/login2/login2.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';
import { RegisterComponent } from './pages/register/register.component';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { UserIconComponent } from './components/user-icon/user-icon.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'login2',
        component: Login2Component
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'profile',
        component: ProfilePageComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.reducer),
        EffectsModule.forFeature([UsersEffects]),
        InputMaskModule,
        DropdownModule,
        ClickOutsideModule,
        CardModule,
        DividerModule
    ],
    declarations: [
        LoginComponent,
        Login2Component,
        RegisterComponent,
        UserIconComponent,
        ProfilePageComponent
    ],
    providers: [UsersFacade],
    exports: [Login2Component, RegisterComponent, UserIconComponent, ProfilePageComponent]
})
export class UsersAuthSharedLibModule {}
