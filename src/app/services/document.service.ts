import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  saveImage(croppedImage, imageAction) {
    let date = new Date().getTime();
    return <any>this.http.post('/uploadimage', { key: date, imageAction: imageAction, file: croppedImage })
  }

}
