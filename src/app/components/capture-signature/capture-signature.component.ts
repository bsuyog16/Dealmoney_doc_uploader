import { DocumentService } from './../../services/document.service';
import { Component, OnInit } from '@angular/core';
import * as Bowser from "bowser";
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';


@Component({
  selector: 'app-capture-signature',
  templateUrl: './capture-signature.component.html',
  styleUrls: ['./capture-signature.component.scss']
})
export class CaptureSignatureComponent implements OnInit {

  imageChangedEvent: any = null;
  croppedImage: any = ''
  showCroppedImage = false;
  platform = '';
  scale = 1;
  transform: ImageTransform = {};
  isPhotoSelectedForSign = false;
  public deviceId: string;
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public facingMode: string = 'environment';
  public errors: WebcamInitError[] = [];
  public webcamImage: any;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  clickedImage = ''

  constructor(public documentService: DocumentService) { }

  ngOnInit(): void {
    const browser = Bowser.getParser(window.navigator.userAgent);
    this.platform = browser.getPlatformType();
  }

  public triggerSnapshot(): void {
    this.trigger.next();
    this.clickedImage = this.webcamImage.imageAsDataUrl;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }


  fileChangeEvent(event: any): void {
    this.showCroppedImage = false;
    this.isPhotoSelectedForSign = false;
    this.imageChangedEvent = null;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    console.log('Image loaded', image);
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  cropImage() {
    this.showCroppedImage = true;
  }

  saveImage() {
    this.documentService.saveImage(this.croppedImage, 'singatureImage').subscribe(result => {
      if (result.status == 200) {
        alert("Image uploaded successfully!")
      }
    });
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  takeSignaturePhoto() {
    this.isPhotoSelectedForSign = true;
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== '') {
      result.facingMode = { ideal: this.facingMode };
    }
    return result;
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }
}
