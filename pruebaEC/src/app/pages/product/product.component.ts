import { Component, Input, OnInit, inject } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { Product } from '../../Models/Product';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  @Input('id') idProducto! : number;
  private productServicio = inject(ProductService);
  public formBuild = inject(FormBuilder);

  public formProduct:FormGroup = this.formBuild.group({
    nombre: [''],
    precio:[0],
    cantidad:[0],
  });

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.idProducto != 0){
      this.productServicio.obtener(this.idProducto).subscribe({
        next:(data) =>{
          this.formProduct.patchValue({
            nombre: data.nombre,
            precio:data.precio,
            cantidad:data.cantidad,
          })
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }

guardar(){
  const objeto : Product = {
    idProducto : this.idProducto,
    nombre: this.formProduct.value.nombre,
    precio: this.formProduct.value.precio,
    cantidad:this.formProduct.value.cantidad,
  }

  if(this.idProducto == 0){
    this.productServicio.crear(objeto).subscribe({
      next:(data) =>{
        if(data.isSuccess){
          this.router.navigate(["/"]);
        }else{
          alert("Error al crear")
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }else{
    this.productServicio.editar(objeto).subscribe({
      next:(data) =>{
        if(data.isSuccess){
          this.router.navigate(["/"]);
        }else{
          alert("Error al editar")
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }


}

volver(){
  this.router.navigate(["/"]);
}


}