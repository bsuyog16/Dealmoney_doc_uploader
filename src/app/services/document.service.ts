import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  saveImage(croppedImage, imageAction) {
    //date used here to give unique name to image. 
    //Kindly use appropriate imagename instead of date. e.g user mobile number
    let date = new Date().getTime();
    return <any>this.http.post('/uploadimage', { key: date, imageAction: imageAction, file: croppedImage })
  }

}
