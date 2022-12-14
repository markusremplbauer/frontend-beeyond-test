import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthenticationService } from './core/authentification/authentication.service';
import { ProgressBarService } from './core/services/progress-bar.service';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { ThemeService } from './core/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { LoadingService } from './core/services/loading.service';
import { delay } from 'rxjs/internal/operators';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('false', style({ opacity: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ opacity: 0, visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = '';
  title = 'beeyond';
  loading = false;

  constructor(
    public authenticationService: AuthenticationService,
    public progressBarService: ProgressBarService,
    public themeService: ThemeService,
    private overlayContainer: OverlayContainer,
    private loadingService: LoadingService
  ) {
    this.themeService.isDarkTheme.subscribe(value => {
      this.className = value ? 'darkMode' : '';
      if (value) {
        this.overlayContainer.getContainerElement().classList.add('darkMode');
      } else {
        this.overlayContainer.getContainerElement().classList.remove('darkMode');
      }
    });
  }

  ngOnInit(): void {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loadingService.loadingSub.pipe(delay(0)).subscribe(loading => {
      this.loading = loading;
    });
  }
}
