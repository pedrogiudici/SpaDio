import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPessoasComponent } from './pessoas/cadastro-pessoas/cadastro-pessoas.component';
import { ListagemPessoasComponent } from './pessoas/listagem-pessoas/listagem-pessoas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pessoas',
    pathMatch: 'full'
  },
  {
    path: 'pessoas',
    children: [
      {
        path:'',
        component: ListagemPessoasComponent
      },
      {
        path:'cadastro',
        children: [
          {
            path: '',
            component: CadastroPessoasComponent,
          },
          {
            path: ':id',
            component: CadastroPessoasComponent,
            pathMatch: 'full'
          }
        ]
      }
    ]
  },
  { path: '**', redirectTo: 'pessoas'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
