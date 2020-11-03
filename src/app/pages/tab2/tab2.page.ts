import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/models/interfaces';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment,{static:true} ) segment : IonSegment;

  categorias = ['bussines','entertainment','general','health','science','sports','technology'];
  noticias : Article[] = [];

  constructor(private noticiasService : NoticiasService) {
  
  }

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cambioCategoria(e){
    this.noticias  = [];
    this.cargarNoticias(e.detail.value)
  }

  cargarNoticias(categoria:string, e? ){
    this.noticiasService.getTopHeadLinesCategoria(categoria)
    .subscribe(resp => {
      console.log(resp);
      
      this.noticias.push(... resp.articles);

      if (e) {
        e.target.complete();
      }
    })    
  }

  loadData(e){
    this.cargarNoticias(this.segment.value, e);
  }

}
