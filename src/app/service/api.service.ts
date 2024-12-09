import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  sercerUrl:string='https://employeefrontend-e88e.onrender.com'
  constructor(private http:HttpClient) {

   }

  //add employees
  addemployeesapi(reqbody:any){
    return this.http.post(`${this.sercerUrl}/employees`,reqbody)
  }

   //all employees
   getemployeeapi(){
    return this.http.get(`${this.sercerUrl}/employees`)

  }

  //delete employees
  deleteemployeeapi(id:string){
    return this.http.delete(`${this.sercerUrl}/employees/${id}`)
  }
  
  
  //edit employees
  editemployeeapi(id:string,reqbody:any){
    return this.http.put(`${this.sercerUrl}/employees/${id}`,reqbody)
  }
}