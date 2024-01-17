import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileModel } from '../models/common.model';



@Injectable({
    providedIn: 'root'
})
export class FileDataService {
    constructor(public http: HttpClient) {

    }

    getFiles():Observable<FileModel[]> {
       return this.http.get<FileModel[]>('/assets/files.json');
    }
}