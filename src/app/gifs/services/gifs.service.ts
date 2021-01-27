import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _history: string[] = [];

  get history() {
    return [...this._history]; //spreed operator, rompe la referencia
  }

  searchGifs(query: string) {
    query = query.trim().toLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query); //insert al inicio
      this._history = this._history.splice(0, 10); //limitar el numero del historial
    }
    console.log(this._history);
  }
  constructor() {}
}
