import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GameService {
  constructor(@Inject(HttpClient) public http: HttpClient) {
    console.log('PeopleService constructor');
  }

  getAllGames(): Promise<any> {
    return this.http.get('../../assets/mocks/games.json').toPromise()
      .then((data: any) => data.games);
  }

  getFilters(): Promise<any> {
    return this.http.get('../../assets/mocks/games.json').toPromise()
      .then((data: any) => data.merchants);
  }

  getGame(id): object | undefined {
    const findGame = ({ ID }) => ID === id;

    return this.getAllGames().then(games => games.find(findGame));
  }
}
