import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileModel } from '../models/common.model';



@Injectable({
    providedIn: 'root'
})
export class FileDataService {

    fileSelected = new BehaviorSubject<string>('');
    urlPasted = new BehaviorSubject<string>('');

    constructor(public http: HttpClient) {
    }

    getFiles():Observable<FileModel[]> {
       return this.http.get<FileModel[]>('assets/files.json');
    }
}