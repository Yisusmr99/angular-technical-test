import { Component, OnInit } from '@angular/core';
import { UsersService } from "../users/users.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string;
  password: string;

  constructor(public userService: UsersService, public router: Router) { 
    this.email = ''
    this.password = ''
  }

  ngOnInit(): void {
  }

  login() {
    const user = {email: this.email, password: this.password};
    this.userService.login(user).subscribe( data => {
      console.log(data);
      this.router.navigateByUrl('home');
    });
  }

}
