import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  invalidLogin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.pattern('[a-zA-Z0-9!$@#]{6,20}')]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(
        this.form.value.email,
        this.form.value.password
      ).subscribe(
        (data: UserModel) => {
          console.log(data);
          if (data !== undefined) {
            this.router.navigate(['/']);
          } else {
            this.invalidLogin = true;
          }
        },
        error => {
          // Login Error
          console.log(error);
        }
      );

      console.log(this.form.value);
    }
  }

}
