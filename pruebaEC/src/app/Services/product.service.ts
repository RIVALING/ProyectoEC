import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsetings';
import { Product } from '../Models/Product';
import { ResponseApi } from '../Models/ResponseApi';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http=inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl+"Products";


  constructor() { }

  lista(){
    return this.http.get<Product[]>(this.apiUrl);
  }

  obtener(id:number){
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  crear(objeto:Product){
    return this.http.post<ResponseApi>(this.apiUrl,objeto);

  }

  editar(objeto:Product){
    return this.http.put<ResponseApi>(this.apiUrl,objeto);

  }

  eliminar(id:number){
    return this.http.delete<ResponseApi>(`${this.apiUrl}/${id}`);
  }

}
