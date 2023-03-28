import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import {ServiciosService} from '../services/servicios.service';
import swal from 'sweetalert2';
import {AreasModel} from '../models/areas.model';
import {SubAreasModel} from '../models/subareas.model';
import {ImpresorasModel} from '../models/impresoras.model';
import {ClientesModel} from '../models/clientes.model';
import {CuentaModel} from '../models/cuenta.model';
import { filter } from 'rxjs/operators';

import { LoginService } from '../services/login.service';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css']
})
export class CuentasComponent implements OnInit {

   @ViewChild(MatSidenav)
  sidenav!: MatSidenav; 

  public cuentas: CuentaModel = new CuentaModel();
  areas: AreasModel[];
  subareas: SubAreasModel[];
  impresoras: ImpresorasModel[];
  clientes: ClientesModel[];
  errores: string[];
  registrosClie: any[];
  ultimoClie: any[];
  cuents: CuentaModel[];
  cuen: CuentaModel[];
  cue: CuentaModel[];
  numeroCliente: number = 0;
  idCliente: number = 0;
  ultimoCliente: number = 0;
  autenticado:boolean = false;
  SelecCliente: String = "-- Selecione un Cliente --";

  constructor(private observer: BreakpointObserver, private serviciosService: ServiciosService,
              private activatedRoute: ActivatedRoute, private router: Router,
              public authService: LoginService) { }

      ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res) =>{
      if(res.matches){
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    })
  }

  ngOnInit(): void {

     if (this.authService.isAuthenticated()) {
      this.autenticado = true;
    }

    this.activatedRoute.paramMap.subscribe(params => {
        let id = +params.get('id');
        if (id) {
          this.serviciosService.getCuentasTodos(id).subscribe((cuentas) => this.cuentas = cuentas);
        }
      });


    this.serviciosService.getArea().subscribe(areass => this.areas = areass);
    this.serviciosService.getCliente().subscribe(clientess => this.clientes = clientess);
   // this.serviciosService.getSubArea().subscribe(subareass => this.subareas = subareass);
    this.serviciosService.getImpresora().subscribe(impresorass => this.impresoras = impresorass);

     this.serviciosService.getCliente().subscribe(
      resp => {

        this.registrosClie = resp;
  

        }
    );


      this.serviciosService.getCuenta().subscribe(
      resp => {

    this.cuents = resp;
  

        }
    );

      this.serviciosService.getCuenta().subscribe(
      resp => {

            this.cue = resp;


        }
    );




  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }


// Codigo para crear el combobox Anidado, el resultado del combobox de la subarea esta en función del Área seleccionada
 onChangeObj(newObj) {
    
     this.serviciosService.getSubArea().subscribe((subareass:any) => {
     this.subareas = subareass.filter(
     (subareass:any) => subareass.areas.id == newObj.id)
     

     })


    
  }



 onChangeObj1(newObj1) {
    
     this.numeroCliente = newObj1.numero_cliente;
     this.idCliente = newObj1.id;
    

     
     this.ultimoClie = this.cuents.filter(
     (cuentass:any) => cuentass.cliente.id == newObj1.id)
     

  }

  validate(input){

       if($(input).attr("name") == "serie" ){

            /*=============================================
            Validamos expresión regular de la serie del equipo
            =============================================*/ 

            let pattern = /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]{1,}$/;

            if(!pattern.test(input.value)){

                $(input).parent().addClass('was-validated');

                input.value = "";

                return;

            }else{

               if($(input).attr("name") == "serie"){

                // con este codigo la informacion que se escriba desde el input
                // la colocamos en la variable filterValue pasandola a minusculas
                 const filterValue = input.value.toLowerCase();

           
           // en la siguiente linea tenemos la forma de realizar un filtrado
           // en la base de datos pero con algun elemento en especifico
           // como decir filtrame todos los elementos donde sea igual a esto
            this.cuen =  this.cue.filter(option => option.serie.toLowerCase() === filterValue);
      
              

                if(this.cuen.length > 0){

                    $(input).parent().addClass('was-validated')
                    input.value = "";
                  
                    swal.fire(
                'No. de Serie repetida!',
                'Esta serie ya esta registrada en una cuenta.',
                'error'
              )


                    return;

                }

               }

            }

    }

  }


 


    createCuenta(): void {

      

      if (this.ultimoClie.length  == 0){

         this.cuentas.numero = this.numeroCliente + 1;
      } 

      else{

       if (this.ultimoClie.length < 7){

        this.cuentas.numero = this.ultimoClie[this.ultimoClie.length-1].numero + 1;
        
      }
 

    }

    
   // this.cuentas.numero = this.registrosClie[this.registrosClie.length-1].numero_cliente + 200;

    

    this.serviciosService.createCuenta(this.cuentas).subscribe(
        cuentas => {

        this.router.navigate(['/listCuen']);
            swal.fire('Cuenta Registrada', 'La cuenta se registro correctamente', 'success');
         

        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

      updateCuenta(): void {
  
  this.serviciosService.updateCuentas(this.cuentas)
    .subscribe(
      json => {
        this.router.navigate(['/listCuen']);
        swal.fire('La Cuenta fue Actualizada', 'La cuenta se ha  Actualizó con éxito', 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }




        onSelect(data: any): void {
       console.log('Item clicked', JSON.parse(JSON.stringify(data)));
     }

     onActivate(data: any): void {
       console.log('Activate', JSON.parse(JSON.stringify(data)));
     }

     onDeactivate(data: any): void {
       console.log('Deactivate', JSON.parse(JSON.stringify(data)));
     }


}
