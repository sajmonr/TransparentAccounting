import {EventEmitter, Injectable, Output} from "@angular/core";
import {HttpClient, HttpEventType, HttpRequest} from "@angular/common/http";
import {ApiMethod, ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class FileService{
  @Output()progress = new EventEmitter<number>();
  @Output()uploadFinished = new EventEmitter<{name: string, path: string}[]>();

  constructor(private http: HttpClient, private api: ApiService){}

  upload(files: File[]){
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', this.api.getUrl(ApiMethod.UploadFile), formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress.emit(Math.round(100 * event.loaded / event.total));
      else if (event.type === HttpEventType.Response){
        if(Array.isArray(event.body)){
          this.uploadFinished.emit(event.body);
        }else{
          this.uploadFinished.emit([]);
        }
      }

    });
  }

}
