import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PessoasService } from "src/app/core/pessoas.service";
import { ValidarCamposService } from "src/app/shared/components/campos/validarCampos.service";
import { Pessoas } from 'src/app/shared/models/pessoas';

@Component({
    selector: 'spa-cadastro-pessoas',
    templateUrl: './cadastro-pessoas.component.html',
    styleUrls:['./cadastro-pessoas.component.css']
})
export class CadastroPessoasComponent implements OnInit{
    id!:number
    cadastro!: FormGroup
    constructor(public validacao: ValidarCamposService, private fb: FormBuilder, private pessoasService: PessoasService, private router: Router, private ar: ActivatedRoute){}
    ngOnInit(){
        this.id = this.ar.snapshot.params['id']
        if (this.id){
            this.pessoasService.visualizar(this.id).subscribe((pessoa:Pessoas) => this.criarFormulario(pessoa))
        }
        this.cadastro = this.fb.group({
            urlFoto:['',[Validators.minLength(10)]],
            nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
            email: ['',[Validators.required, Validators.email]],
            data: [Date.now().toString()]
        })
    }
    get f (){
        return this.cadastro.controls
      }
    submit(){
        this.cadastro.markAllAsTouched()
        if (this.cadastro.invalid){
            return
        }
        const pessoa = this.cadastro.getRawValue() as Pessoas
        if (this.id) {
            pessoa.id = this.id
            this.editar(pessoa)
        }else{
            this.salvar(pessoa)
        }
    }
    voltar():void {
        console.log('ue')
        this.router.navigateByUrl('pessoas')
    }
    private criarFormulario(pessoa:Pessoas):void{
        this.cadastro = this.fb.group({
            urlFoto:[pessoa.urlFoto,[Validators.minLength(10)]],
            nome: [pessoa.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
            email: [pessoa.email,[Validators.minLength(10)]],
            data: [pessoa.data]  
        })
    }
    private salvar(pessoa: Pessoas): void{
        this.pessoasService.salvar(pessoa).subscribe(()=> {
            this.router.navigateByUrl('pessoas')
        })
    }
    private editar(pessoa: Pessoas):void{
        this.pessoasService.editar(pessoa).subscribe(() => {
            this.router.navigateByUrl('pessoas')
        })
    }
}