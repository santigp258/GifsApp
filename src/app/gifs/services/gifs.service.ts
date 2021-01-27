import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsReponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'cHmxZ109D6hGo5rltOLpXg8XGOgOgGOS';
  private _history: string[] = [];
  
  //TODO cambiar any por su tipo correspondiente
  public results: Gif[] = [];

  get history() {
    return [...this._history]; //spreed operator, rompe la referencia
  }

  constructor(private http: HttpClient) {}

  searchGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query); //insert al inicio
      this._history = this._history.splice(0, 10); //limitar el numero del historial
    }

    this.http
      .get<SearchGifsReponse>(
        `https://api.giphy.com/v1/stickers/search?api_key=${this.apiKey}&q=${query}&limit=10`
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.results = resp.data;
      }); //se ejecuta cuando tenga la resolución del get
  }
}
