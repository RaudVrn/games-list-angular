import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-games-filter',
  templateUrl: './games-filter.component.html',
  styleUrls: ['./games-filter.component.scss']
})
export class GamesFilterComponent implements OnInit {
  @Input() gamesFilters;
  @Output() filterChanged = new EventEmitter<object[]>();

  filters: object = {};
  activeFilters: object[] = [];

  handleChangeFilter(id): void {
    const index = this.activeFilters.findIndex(filterId => filterId === id);

    if (index !== -1) {
      this.activeFilters.splice(index, 1);
    } else {
      this.activeFilters.push(id);
    }

    this.filterChanged.emit(this.activeFilters);
  }

  active(id): boolean {
    return this.activeFilters.includes(id);
  }

  ngOnInit(): void {
    this.filters = Object.values(this.gamesFilters);
  }
}
