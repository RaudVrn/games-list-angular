import { UIRouter } from '@uirouter/core';
import { Injector, Injectable } from '@angular/core';
import { GameService } from '../services/game';

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector): void {
  const gameService = injector.get(GameService);

  // If the browser URL doesn't matches any state when the router starts,
  // go to the `hello` state by default
  router.urlService.rules.initial({ state: 'hello' });
}
