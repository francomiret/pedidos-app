import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});

  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);
  public error?: string | null;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.loginForm.addControl('email', this.email);
    this.loginForm.addControl('password', this.password);
  }

  submit() {
    if (
      this.loginForm.valid &&
      this.loginForm.touched &&
      this.email.value &&
      this.password.value
    ) {
      this.error = '';
      this.loginForm.reset();

      this.afAuth
        .signInWithEmailAndPassword(this.email.value, this.password.value)
        .then((response) => {
          // Inicio de sesión exitoso
          console.log(response);
        })
        .catch((error) => {
          // Error al iniciar sesión
          this.error = error;
          console.error(error);
        });
    } else {
      this.error = 'Username or password invalid';
    }
  }
}
