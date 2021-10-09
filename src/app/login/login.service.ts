import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

@Injectable({providedIn: 'root'})
export class LoginService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http:HttpClient) {}

    public login(username: string, password: string): Observable<any> {
        return this.http.get<boolean>(`${this.apiServerUrl}/employee/login/${username}/${password}`);
    }
}