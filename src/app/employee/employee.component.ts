import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from "../employee";
import { EmployeeService } from './employee.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'employee-root',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  title = 'magic-cinema-angular';

  public employees: Employee[] = [];
  listData: MatTableDataSource<any> = new MatTableDataSource();
  displayColumns: string[] = ['ID', 'USERNAME', 'NAME', 'SURNAME', 'EMAIL', 'DATE CREATED', 'PASSWORD', 'ROLE', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  closeResult: string;

  constructor(private employeeService: EmployeeService, private dialog: MatDialog, private modalService: NgbModal) { }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        this.listData = new MatTableDataSource(this.employees);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    );
  }

  onSearchClear() {
    this.searchKey ="";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

