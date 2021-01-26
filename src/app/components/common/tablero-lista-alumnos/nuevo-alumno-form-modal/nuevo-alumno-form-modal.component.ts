import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';
import { ToastrService } from 'ngx-toastr';
import { RegistroUsuarioAlumnoBody } from 'src/app/models/request/body/registro-usuario-alumno-body.interface';
import { AlumnoService } from 'src/app/services/api/alumno/alumno.service';
import { UsuarioService } from 'src/app/services/api/usuario/usuario.service';
import { ApiErrorResponseMessageFactory } from 'src/app/utils/api-error-response-message-factory';

@Component({
  selector: 'app-nuevo-alumno-form-modal',
  templateUrl: './nuevo-alumno-form-modal.component.html',
  styleUrls: ['./nuevo-alumno-form-modal.component.css']
})
export class NuevoAlumnoFormModalComponent implements OnInit {

  @Input()
  modalId!: string;

  @Input()
  modalActions!: EventEmitter<string | MaterializeAction>;

  formulario: RegistroUsuarioAlumnoBody = {
    nombres: '',
    apePaterno: '',
    apeMaterno: '',
    correoElectronico: '',
    codigo: '',
    clave: '',
    dni: '',
    sexo: ''
  };

  constructor(
    private _usuarioService: UsuarioService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  registrarAlumno(e: Event): void {
    e.preventDefault();

    this._usuarioService
      .registroUsuarioAlumno(this.formulario)
      .subscribe(
        (resp) => {
          this.limpiarFormulario();

          this._toastrService.success(resp.mensaje);
        },
        (respError) => {
          console.warn(respError);
          const msg = ApiErrorResponseMessageFactory.build(respError.error);
          this._toastrService.error(msg);
        }
      );
  }

  limpiarFormulario(): void {
    this.formulario.nombres = '';
    this.formulario.apePaterno = '';
    this.formulario.apeMaterno = '';
    this.formulario.clave = '';
    this.formulario.codigo = '';
    this.formulario.correoElectronico = '';
    this.formulario.dni = '';
  }

  cerrarModal(): void {
    this.limpiarFormulario();
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
