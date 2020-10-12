import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UIRouterModule } from '@uirouter/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { GamesListComponent } from './games-list/games-list.component';
import { GameComponent } from './game/game.component';
import { GamesFilterComponent } from './games-filter/games-filter.component';

import { STATES as states } from './router/states';
import { uiRouterConfigFn } from './router/config';
import { GameService } from './services/game';
import { GameSearchComponent } from './game-search/game-search.component';


@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    AboutComponent,
    GameComponent,
    GamesFilterComponent,
    GameSearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UIRouterModule.forRoot({ states, useHash: true, config: uiRouterConfigFn, })
  ],
  providers: [
    { provide: GameService, useClass: GameService },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
