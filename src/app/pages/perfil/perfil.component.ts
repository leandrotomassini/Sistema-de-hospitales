import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;

  constructor(private fb: FormBuilder, private usaurioService: UsuarioService) { }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
    });
  }

  actualizarPerfil() {
    console.log(this.perfilForm.value);
    this.usaurioService.actualizarPerfil(this.perfilForm.value)
    .subscribe(resp => {
      console.log(resp);
    })
  }
}
