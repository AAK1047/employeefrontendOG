import { Component, OnInit } from '@angular/core';

import { ApiService } from './service/api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'fronend';
  constructor (private api:ApiService){}

  employeeGroup =new FormGroup({
    name: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required),
    age: new FormControl("",Validators.required),
    status: new FormControl("",Validators.required),
    
  })

  employees:any=[]
  empstatic:any=[]
  
  ngOnInit(): void {
    this.getemployee()
      
  }

  status:string="all"

  filter(){
    if(this.status=="all"){
          this.employees=this.empstatic
    }
    else{
      this.employees=this.empstatic.filter((item:any)=>this.status==item.status)
      console.log(this.status);
    }

    
    
  }


  btnvalue:string=""

  setbtnval(val:string){
    this.btnvalue=val
  }

  addemployee(){
    if(this.employeeGroup.invalid){
      alert("please fill the fprm completely")
    }
    else{
      this.api.addemployeesapi(this.employeeGroup.value).subscribe({
        next:(result:any)=>{
           console.log(result);
           alert("employee added successfull")
        this.getemployee()

           this.employeeGroup.reset()
        
        } ,
        error:(err:any)=>{
            console.log(err);
            
        }
      })
    }
    
    
  }

  getemployee(){
    this.api.getemployeeapi().subscribe({
      next:(res:any)=>{
         console.log(res);
         this.employees=res
         this.empstatic=res
      },
      error:(err:any)=>{
        console.log(err);
        
        
      }
    })

  }

  deleteemplotee(id:string){
    this.api.deleteemployeeapi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getemployee()
        

      },
      error:(err:any)=>{
        console.log(err);
        

      }
    })
  }

  edit : any =[]


  editemployee(id:string){
    this.setbtnval("edit")
     this.edit=this.employees.filter((emp:any)=> emp.id ==id)
    this.employeeGroup.setValue({
      name:this.edit[0].name,
      email:this.edit[0].email,
      age:this.edit[0].age,
      status:this.edit[0].status
    })
  }

  editsave(){
    this.api.editemployeeapi(this.edit[0].id,this.employeeGroup.value).subscribe({
      next:(result:any)=>{
         console.log(result);
         alert("details edited successfull")
      this.getemployee()

         this.employeeGroup.reset()
      
      } ,
      error:(err:any)=>{
          console.log(err);
          
      }
    })
  }

  
  

}
