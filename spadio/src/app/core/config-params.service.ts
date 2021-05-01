import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigParams } from '../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }
  configurarParams(config: ConfigParams): HttpParams {
    let httpParams = new HttpParams()
    if (config.limite){
      httpParams = httpParams.set('_limit', config.limite.toString())
    }
    if (config.pagina){
      httpParams = httpParams.set('_page', config.pagina.toString())
    }
    if (config.pesquisa){
      httpParams = httpParams.set('q', config.pesquisa)
    }
    return httpParams
  }
}
