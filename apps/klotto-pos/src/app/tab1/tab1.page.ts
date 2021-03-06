import { Component } from '@angular/core';

import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  photo: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  takePicture() {
    Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    })
      .then((image) => {
        this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
          image && image.dataUrl
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
