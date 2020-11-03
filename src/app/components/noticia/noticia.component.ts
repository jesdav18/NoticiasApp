import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Article } from 'src/app/models/interfaces';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia : Article;
  @Input() indice : number;

  constructor(private inAppBrowser : InAppBrowser, private actionSheetCtrl : ActionSheetController, 
    private socialSharing : SocialSharing ) { }

  ngOnInit() {}

  abrirNoticia(){
    const browser = this.inAppBrowser.create(this.noticia.url,'_system')
  }

  async lanzarMenu(){
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share-social-outline',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Shared clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      }, {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorito');
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

}
