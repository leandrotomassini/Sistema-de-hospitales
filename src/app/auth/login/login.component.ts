import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService, private ngZone: NgZone) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [false]
    });
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {

    google.accounts.id.initialize({
      client_id: "51263825049-k2drbrjv2r9b01ra38188iinp25i6dgb.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe(
      resp => {
        this.ngZone.run(() => {
          //  Navegar al dashboard
          this.router.navigateByUrl('/');
        });
      }
    );
  }

  login() {
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {

        if (this.loginForm.get('remember')!.value) {
          localStorage.setItem('email', this.loginForm.get('email')!.value)
        } else {
          localStorage.removeItem('email');
        }

        //  Navegar al dashboard
        this.router.navigateByUrl('/');
      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      });
  }


}
