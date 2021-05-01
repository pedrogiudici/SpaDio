import { Component, NgModule, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { Router } from "@angular/router";
import { PessoasService } from "src/app/core/pessoas.service";
import { AlertaComponent } from "src/app/shared/components/alerta/alerta.component";
import { Alerta } from "src/app/shared/models/alerta";
import { Pessoas } from 'src/app/shared/models/pessoas';
import { ConfigParams } from "src/app/shared/models/config-params";

@Component({
    selector: 'spa-listagem-pessoas',
    templateUrl: './listagem-pessoas.component.html',
    styleUrls: ['./listagem-pessoas.component.css']
})
export class ListagemPessoasComponent implements OnInit{
    @ViewChild(MatTable) table!: MatTable<any>
    readonly semFoto = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.eCrcK2BiqwBGE1naWwK3UwHaHa%26pid%3DApi&f=1'
    config: ConfigParams = {
      pagina: 1,
      limite: 6
    }
    filtrosListagem!: FormGroup
    constructor(private pessoasService: PessoasService,private router: Router, private fb: FormBuilder, public dialog: MatDialog){}
    displayedColumns: string[] = ['urlFoto', 'nome', 'email', 'data', 'botoes'];
    pessoas: Pessoas[] = []
    ngOnInit():void {
      this.filtrosListagem = this.fb.group({
        texto: ['']
      })
      this.filtrosListagem.get('texto')?.valueChanges.pipe(debounceTime(400)).subscribe((val:string) => {
        this.config.pesquisa = val
        this.resetLista()
        this.listar()
      })
      this.listar()
    }
    onScroll():void {
      this.config.pagina++
      this.listar()
    }
    edit(id: number):void{
      this.router.navigateByUrl('/pessoas/cadastro/' + id)
    }
    delete(id:number):void{
        const config = {
            data: {
              titulo: 'Você tem certeza que deseja excluir?',
              descricao: 'Caso você tenha certeza que deseja excluir, clique no botão OK',
              possuiDoisBtn: true,
              corBtn: 'warn'
            } as Alerta
          }
        const dialogRef = this.dialog.open(AlertaComponent, config)
        dialogRef.afterClosed().subscribe((opcao:boolean)=>{
          if (opcao){
            this.pessoasService.delete(id).subscribe(() => {
                this.resetLista()
                this.listar()
            })
          }
        })
    }
    private resetLista():void{
      this.config.pagina = 1
      this.pessoas = []
    }
    private listar(): void{
        this.pessoasService.listar(this.config).subscribe((arrPessoas) => {
            this.pessoas.push(...arrPessoas)
            this.table?.renderRows()
        },
        err => console.log(err))
    }
}