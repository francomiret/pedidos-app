import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({});

  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.loginForm.addControl('email', this.email);
    this.loginForm.addControl('password', this.password);
  }

  login() {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        // Inicio de sesión exitoso
        console.log(response);
      })
      .catch((error) => {
        // Error al iniciar sesión
        console.error(error);
      });
  }
}
