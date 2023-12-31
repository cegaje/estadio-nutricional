import { Component, Input, OnInit,SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { ReporteEstres } from 'src/app/models/reporte-imc/reporte-estres.interface';

enum InformeImcGrupalPorcentajeNivelEstresCardEstados {
  VACIO,
  CARGANDO,
  CON_DATOS
}

@Component({
  selector: 'app-informe-imc-grupal-porcentaje-nivel-estres-card',
  templateUrl: './informe-imc-grupal-porcentaje-nivel-estres-card.component.html',
  styleUrls: ['./informe-imc-grupal-porcentaje-nivel-estres-card.component.css']
})
export class InformeImcGrupalPorcentajeNivelEstresCardComponent implements OnInit {

  @Input() reporteEstres: ReporteEstres | undefined;

  public Estados = InformeImcGrupalPorcentajeNivelEstresCardEstados;

  public estado: InformeImcGrupalPorcentajeNivelEstresCardEstados 
    = InformeImcGrupalPorcentajeNivelEstresCardEstados.VACIO;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public colores = [{
    backgroundColor:[
      'rgba(134, 199, 243, 1)',
      'rgba(255, 161, 181, 1)', 
      'rgba(180, 169, 20, 1)', 
      //OJO: Si hay mas de 2 datos, colocar mas colores
    ]
  }];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.estado = InformeImcGrupalPorcentajeNivelEstresCardEstados.CARGANDO;
    if (this.reporteEstres) {
      this.pieChartData = [];
      this.pieChartData.push(this.reporteEstres.Severo.totalAlumnos);
      this.pieChartData.push(this.reporteEstres.Moderado.totalAlumnos);
      this.pieChartData.push(this.reporteEstres.Leve.totalAlumnos);

      this.pieChartLabels = [];
      this.pieChartLabels.push(`Severo (${this.reporteEstres.Severo.porcentaje * 100})%`);
      this.pieChartLabels.push(`Moderado (${this.reporteEstres.Moderado.porcentaje * 100})%`);
      this.pieChartLabels.push(`Leve (${this.reporteEstres.Leve.porcentaje * 100})%`);
      this.estado = InformeImcGrupalPorcentajeNivelEstresCardEstados.CON_DATOS;
    } else {
      this.estado = InformeImcGrupalPorcentajeNivelEstresCardEstados.VACIO;
    }
  }

}
