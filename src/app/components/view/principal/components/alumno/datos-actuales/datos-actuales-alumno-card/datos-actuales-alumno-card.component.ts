import { Component, OnInit } from '@angular/core';
import { DatoAntropometrico } from 'src/app/models/dato-antropomentrico.interface';
import { Persona } from 'src/app/models/persona.interface';
import { DatosAntropometricosService } from 'src/app/services/api/datos-antropometricos/datos-antropometricos.service';
import { AppUsuarioService } from 'src/app/services/data/app-usuario.service';

enum DatosActualesAlumnoCardEstados {
  VACIO,
  CARGANDO,
  CON_DATOS
}

@Component({
  selector: 'app-datos-actuales-alumno-card',
  templateUrl: './datos-actuales-alumno-card.component.html',
  styleUrls: ['./datos-actuales-alumno-card.component.css']
})
export class DatosActualesAlumnoCardComponent implements OnInit {

  public Estados = DatosActualesAlumnoCardEstados;
  public estado = DatosActualesAlumnoCardEstados.VACIO;
  public persona: Persona | null = null;
  public datosActuales: DatoAntropometrico | undefined;

  constructor(
    private _appUsuarioService: AppUsuarioService,
    private _datosAntropometricosService: DatosAntropometricosService
  ) { 
    this.persona = _appUsuarioService.obtenerPersonaAutenticada();
  }

  ngOnInit(): void {
    if (this.persona) {
      this.estado = DatosActualesAlumnoCardEstados.CARGANDO;
      this._datosAntropometricosService
        .obtenerDatosAntropometricosActualesPorIdPersona(this.persona.id)
        .subscribe(
          (resp) => {
            this.datosActuales = resp.datos;
            this.estado = DatosActualesAlumnoCardEstados.CON_DATOS;
          },
          (respError) => {
            console.warn(respError);
            this.estado = DatosActualesAlumnoCardEstados.VACIO;
          }
        );
    }
  }

}