import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsReponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'cHmxZ109D6hGo5rltOLpXg8XGOgOgGOS';
  private serviceUrl: string = 'https://api.giphy.com/v1/stickers';
  private _history: string[] = [];

  //TODO cambiar any por su tipo correspondiente: hecho
  public results: Gif[] = [];

  get history() {
    return [...this._history]; //spreed operator, rompe la referencia
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (!this._history.includes(query)) {
      this._history.unshift(query); //insert al inicio
      this._history = this._history.splice(0, 10); //limitar el numero del historial

      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsReponse>(
        `${this.serviceUrl}/search`, {params} //params:params
      )
      .subscribe((resp) => {
        console.log(resp.data);
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      }); //se ejecuta cuando tenga la resolución del get
  }
}
