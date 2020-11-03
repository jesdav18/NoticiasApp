import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/models/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasService : NoticiasService) {
    
  }

  ngOnInit() {
   this.cargarNoticias();
  }

  loadData(e){
    this.cargarNoticias();
  }

  cargarNoticias(e?){
    this.noticiasService.getTopHeadLines()
    .subscribe(response => {
      console.log('Noticias',response);
      this.noticias.push(...response.articles)
      
      if (response.articles.length === 0) {
        e.target.disabled = true;
        e.target.complete();
        return;
      }

      if (e) {
        e.target.complete();
      }
    })
  }

}
