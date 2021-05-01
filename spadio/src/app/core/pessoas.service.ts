import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigParams } from "../shared/models/config-params";
import { Pessoas } from "../shared/models/pessoas";
import { ConfigParamsService } from "./config-params.service";

const url = 'http://localhost:3000/pessoas/'
@Injectable({
    providedIn: 'root'
})
export class PessoasService{
    constructor(private http: HttpClient, private configParams: ConfigParamsService){}
    listar(config:ConfigParams):Observable<Pessoas[]>{
        const httpParams = this.configParams.configurarParams(config)
        return this.http.get<Pessoas[]>(url, {params: httpParams})
    }
    delete(id:number):Observable<void>{
        return this.http.delete<void>(url + id)
    }
    salvar(pessoa: Pessoas):Observable<Pessoas>{
        return this.http.post<Pessoas>(url, pessoa)
    }
    editar(pessoa:Pessoas):Observable<Pessoas>{
        return this.http.put<Pessoas>(url + pessoa.id, pessoa)
    }
    visualizar(id:number):Observable<Pessoas>{
        return this.http.get<Pessoas>(url + id)
    }
}