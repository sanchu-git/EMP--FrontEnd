import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ""
  password: String = ""

  constructor(private toaster:ToastrService, private api:AdminService, private router:Router){

  }

  

  login(){
    // admin login logic

    if(this.email && this.password){
      // this.toaster.success("Proceed to API call")

      this.api.getAdminDetails().subscribe({
        next:(res:any)=>{
          console.log(res);
          const {email,password} = res

          if(email == this.email && password== this.password){
            this.toaster.success("Login Successfull")
            sessionStorage.setItem("adminDetails",JSON.stringify(res))
            this.email= ""
            this.password=""
            // navihgate
            this.router.navigateByUrl("/dashboard")
          }else{
            this.toaster.error("Invalid Email / Password")
          }
          
        },
        error:(reson:any)=>{
          this.toaster.error(reson);
          
        }
      })

    }else{
      this.toaster.info("Please Fill the Form Completely!!!")
    }
  }
}
