import { GamesListComponent } from '../games-list/games-list.component';
import { GameComponent } from '../game/game.component';
import { AboutComponent } from '../about/about.component';
import { GameService } from '../services/game';
import { Transition } from '@uirouter/core';

const aboutState = { name: 'about', url: '/about',  component: AboutComponent };

const gamesListState = {
  name: 'gamesList',
  url: '/games',
  component: GamesListComponent,
  resolve: [
    {
      token: 'gamesList',
      deps: [GameService],
      resolveFn: (gameService: GameService) => gameService.getAllGames()
    },
    {
      token: 'gamesFilters',
      deps: [GameService],
      resolveFn: (gameService: GameService) => gameService.getFilters()
    },
  ]
};

const gameState = {
  name: 'game',
  url: '/games/:id',
  component: GameComponent,
  resolve: [
    {
      token: 'game',
      deps: [Transition, GameService],
      resolveFn: (trans: Transition, gameService: GameService) =>
        gameService.getGame(trans.params().id)
    }
  ]
};

export const STATES = [
  gamesListState,
  gameState,
  aboutState,
];
