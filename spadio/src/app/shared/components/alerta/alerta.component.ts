import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alerta } from '../../models/alerta';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit{
  alerta = {
    titulo: 'Sucesso!',
    descricao: 'Seu registro foi cadastrado com sucesso',
    btnSucesso: 'Ok',
    btnCancelar: 'Cancelar',
    corBtn: 'accent',
    possuiDoisBtn: false
  } as Alerta
  constructor(public dialogRef: MatDialogRef<AlertaComponent>, @Inject(MAT_DIALOG_DATA) public data: Alerta){}
  ngOnInit() {
    if(this.data){
      this.alerta.titulo = this.data.titulo || this.alerta.titulo
      this.alerta.descricao = this.data.descricao || this.alerta.descricao
      this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso
      this.alerta.btnCancelar = this.data.btnCancelar || this.alerta.btnCancelar
      this.alerta.corBtn = this.data.corBtn || this.alerta.corBtn
      this.alerta.possuiDoisBtn = this.data.possuiDoisBtn || this.alerta.possuiDoisBtn
    }
  }
}
