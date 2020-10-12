import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent implements OnInit {
  @Input() gamesList;
  @Input() gamesFilters;

  sortABC = true;
  perPage = 50;
  page = 1;
  filters: number[] = [];
  favoritesList: object[] = [];
  searchResult: object[] = [];

  static localFavorites(): string {
    return localStorage.getItem('favorites');
  }

  favorites(): object[] {
    this.favoritesList = JSON.parse(GamesListComponent.localFavorites());
    return this.favoritesList;
  }

  inFavorites(gameID): boolean {
    return this.favoritesList.map((game: { ID: number}) => game.ID).includes(gameID);
  }

  games(): object[] {
    return this.filteredList(this.sortedList());
  }

  paginateGames(): object[] {
    return this.games()
      .filter((item, index) => {
        return this.page > 1
          ? index > this.perPage * (this.page - 1) && index < this.perPage * this.page
          : index < this.perPage * this.page;
      });
  }

  filteredList(games): object[] {
    return this.filters.length
      ? games.filter(({ MerchantID }) => this.filters.includes(MerchantID))
      : games;
  }

  sortedList(): object[] {
    return [
      ...this.favorites(),
      ...this.gamesList.sort(({ Name: { en: nameA }, idA}, { Name: { en: nameB }}) => {
      return this.sortABC
        ? nameA.localeCompare(nameB, 'en')
        : nameB.localeCompare(nameA, 'en');
    })];
  }

  pages(): number {
    return Math.round(this.games().length / this.perPage);
  }

  toggleSort(): void {
    this.page = 1;
    this.sortABC = !this.sortABC;
  }

  handleChangePerPage(value): void {
    this.perPage = value === 'all' ? this.gamesList.length : Number(value);
    this.page = 1;
  }

  handleChangePage(page): void {
    this.page = page;
  }

  toggleFavorites(game): void {
    let localFav: object[];
    let localFavGameIndex: number;

    if (!GamesListComponent.localFavorites()) {
      localStorage.setItem('favorites', '[]');
    }

    localFav = this.favorites();
    localFavGameIndex = localFav
      .filter(i => i)
      .findIndex((fav: { ID: number }) => fav.ID === game.ID);

    if (localFavGameIndex !== -1) {
      localFav.splice(localFavGameIndex, 1);
    } else {
      localFav.push(game);
    }

    localStorage.setItem('favorites', JSON.stringify(localFav));
  }

  handleChangeFilters(filters): void {
    this.filters = filters;
    this.page = 1;
  }

  mappedFilters(): object[] {
    return this.filters.map(filterID => this.gamesFilters[filterID].Name);
  }

  handleSearch(term): void {
    if (term) {
      this.searchResult = this.gamesList
        .filter((game: { Name: { en: string }}) =>
          game.Name.en.toLowerCase().includes(term.toLowerCase())
        );
    } else if (this.searchResult.length) {
      this.searchResult = [];
    }
  }

  ngOnInit(): void {
    const localFav: any = localStorage.getItem('favorites');

    if (!localFav) {
      localStorage.setItem('favorites', '[]');
    }
  }
}
