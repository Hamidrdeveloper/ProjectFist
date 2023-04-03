import {Email, LinkForgetPassword, SignUp} from './types';
import AuthDataService from './Auth.service';
import React from 'react';
import {ForgetPasswordModel, SignInModel, SignUpModel} from './model';

export function singUpAc() {
  return AuthDataService.signUp(SignUpModel);
}
export function singInAc() {
  return AuthDataService.signIn(SignInModel);
}
export function legalsAc(value:any) {
  return AuthDataService.legals(value);
}
export function userLegalsAc() {
  return AuthDataService.userLegals();
}


export function forgetPasswordAc(email:string) {
  return AuthDataService.forgetPassword(email);
}
export function linkForgetPasswordAc(value: LinkForgetPassword) {
  return AuthDataService.linkForgetPassword(value);
}
export function countriesAc() {
  return AuthDataService.countries();
}
export function languageAc() {
  return AuthDataService.language();
}
export function userDeactiveAc() {
  return AuthDataService.userDeactive();
}

export function deleteAccountAc(value:any) {
  return AuthDataService.deleteAccount(value);
}
// {"password":"123456789","current_password":"12345678","password_confirmation":"123456789"}