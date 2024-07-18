import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ProductService } from '../../Services/product.service';
import{Product} from '../../Models/Product';
import { Router } from '@angular/router'


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private productServicio = inject(ProductService);
  public listaProduct:Product[]=[];
  public displayedColumns : string[]=['nombre', 'precio', 'cantidad','accion'];

  obtenerProduct(){
    
    this.productServicio.lista().subscribe({
      next:(productos)=>{
        this.onLoadProductos(productos)
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
    console.log("Test")
  }

  constructor(private router:Router){

      this.obtenerProduct();

  }

  onLoadProductos(productos:Product[]){
    console.log("Llegaron los productos")
    if(productos.length> 0){
      this.listaProduct = productos;
    }
  }

  nuevo(){
    this.router.navigate(['/product',0]);
  }

  editar(objeto:Product){
    this.router.navigate(['/product', objeto.idProducto]);
  }

  eliminar(objeto:Product){

    if(confirm("Desea eliminar el producto " + objeto.nombre)){
      this.productServicio.eliminar(objeto.idProducto).subscribe({

        next:(data)=>{
          if(data.isSuccess){
            this.obtenerProduct();
          }else{
            alert("No se puedo eliminar. ")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }
}
