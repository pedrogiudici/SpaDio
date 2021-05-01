import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({
    providedIn:'root'
})
export class ValidarCamposService{
    hasErrorValidator(control:AbstractControl, errorName:string):any {
        if(control.dirty || control.touched){
            return control.hasError(errorName)
        }   
    }
}