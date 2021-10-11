import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Employee } from "../employee";

@Injectable({
    providedIn: 'root'
})

@Injectable({providedIn: 'root'})
export class EmployeeService {
    private apiServerUrl = environment.apiBaseUrl;
    
    constructor(private http:HttpClient) {}

    public getEmployees(): Observable<any> {
        return this.http.get<any>(`${this.apiServerUrl}/employee/getall`);
    }

    public getEmployeeById(employeeId: string): Observable<any> {
        return this.http.get<any>(`${this.apiServerUrl}/employee/read/${employeeId}`);
    }

    public addEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${this.apiServerUrl}/employee/create`, employee);
    }

    public updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
    }

    public deleteEmployee(employeeId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
    }

    public getEmployeeRoles(): Observable<any> {
        return this.http.get<any>(`${this.apiServerUrl}/role/getall`);
    }
}