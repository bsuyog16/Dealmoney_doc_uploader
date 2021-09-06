import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crop';
  selfieMode = false;
  signatureMode = false;

  clickSelfie() {
    this.selfieMode = true;
  }
  uploadSignature() {
    this.signatureMode = true;
  }
}
