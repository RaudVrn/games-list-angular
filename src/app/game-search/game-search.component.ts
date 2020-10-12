import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.scss']
})
export class GameSearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();

  handleChange(term): void {
    this.search.emit(term.trim());
  }

  ngOnInit(): void {
  }

}
