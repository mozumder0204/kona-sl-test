import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Auth } from '../auth/models/auth.model';
import { AsyncService } from '../shared/services/async.service';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean> = of(false);
  isLoading: boolean;
  isFullScreen = false;
  authInfo: Auth;
  private authSub: Subscription;
  private uiInfoSub: Subscription;
  private asyncSub: Subscription;
  defaultsrc = '/assets/images/avatar_square_blue.png';

  private _mobileQueryListener: () => void;
  routerOutletActive: boolean = false;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private asyncService: AsyncService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;

    this.authSub = this.authService.authInfo.subscribe((authInfo) => {
      this.authInfo = authInfo;
      this.routerOutletActive = true;
      this.changeDetectorRef.detectChanges();
    });

    this.asyncSub = this.asyncService.isLoading.subscribe((loading) => {
      this.isLoading = loading;
      this.changeDetectorRef.detectChanges();
    });

    this.asyncService.finish(); // close aborted loading
  }

  onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.asyncSub.unsubscribe();
    this.asyncService.finish();
  }
}
