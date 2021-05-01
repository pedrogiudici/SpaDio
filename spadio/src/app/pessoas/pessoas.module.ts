import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MaterialModule } from "../shared/material/material.module";
import { CadastroPessoasComponent } from "./cadastro-pessoas/cadastro-pessoas.component";
import { ListagemPessoasComponent } from "./listagem-pessoas/listagem-pessoas.component";

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        InfiniteScrollModule
    ],
    declarations: [
        ListagemPessoasComponent,
        CadastroPessoasComponent
    ]
})
export class PessoasModule {}