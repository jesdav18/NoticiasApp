import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { RespuestaTopHeadLines } from '../models/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage : number = 0;

  categoriaActual : string = '';
  categoriaPage : number = 0;

  constructor(private http : HttpClient) { }

  private ejecutarQuery<T>(query : string){
    query = apiUrl + query;
    return this.http.get<T>(query,{headers})
  }

  getTopHeadLines(){
    this.headLinesPage ++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
  }

  getTopHeadLinesCategoria(categoria : string){
    
    if (this.categoriaActual === categoria) {
      this.categoriaPage ++;
    }
    else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria
    }
    
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}`);
  }
}
