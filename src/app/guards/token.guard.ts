import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  Router,
  CanLoad,
} from '@angular/router';
import { CdkSession } from '@core/engine';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate, CanActivateChild, CanLoad {
  public jwtHelper = new JwtHelperService();

  public get hasToken(): boolean {
    return !!this.session.get('isloggedin');
  }

  constructor(
    protected readonly router: Router,
    protected readonly session: CdkSession
  ) {}

  public canActivate(): boolean {
    if (!this.hasToken) {
      this.router.navigateByUrl('/account/login');
      return false;
    }

    return this.isTokenExpired();
  }

  public canActivateChild(): boolean {
    if (!this.hasToken) {
      this.router.navigateByUrl('/account/login');
      return false;
    }
    return this.isTokenExpired();
  }

  public canLoad(): boolean {
    if (!this.hasToken) {
      this.router.navigateByUrl('/account/login');
      return false;
    }
    return this.isTokenExpired();
  }

  public isTokenExpired(): boolean {
    if (this.jwtHelper.isTokenExpired(this.session.get('token'))) {
      this.router.navigateByUrl('error/token?returnTo=%2Faccount%2Flogin');
      return false;
    } else {
      return true;
    }
  }
}
