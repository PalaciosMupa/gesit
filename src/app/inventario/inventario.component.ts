import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {InventarioModel} from '../models/inventario.model';
import { Router, ActivatedRoute } from '@angular/router';
import {ServiciosService} from '../services/servicios.service';
import swal from 'sweetalert2';
import {AreasModel} from '../models/areas.model';
import {SubAreasModel} from '../models/subareas.model';
import {ImpresorasModel} from '../models/impresoras.model';
import {EquiposModel} from '../models/equipos.model';
import {ConsumibleModel} from '../models/consumible.model';
import { LoginService } from '../services/login.service';

import { filter } from 'rxjs/operators';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
   autenticado:boolean = false;
  admin:boolean = false; 
   

  public inventarios: InventarioModel = new InventarioModel();

  areas: AreasModel[];
  subareas: SubAreasModel[];
  impresoras: ImpresorasModel[];
  equipos:  EquiposModel[];
  consumibles: ConsumibleModel[];
  inventa:  InventarioModel[];
  inventar: InventarioModel[];

  errores: string[];
  
  method:boolean = false;
  impre:boolean = false;
  asignada:boolean=false;
  bodega:boolean=false;
  refac:boolean=false;
  consum:boolean=false;
  equip:boolean=false;
  toner:boolean=false;
  imagen:boolean=false;
  fusor:boolean=false;
  color:boolean=false;
  mono:boolean=false;


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
          this.serviciosService.getInventarioTodos(id).subscribe((inventarios) => this.inventarios = inventarios);
        }
      });



   this.serviciosService.getEquipos().subscribe(equiposs => this.equipos = equiposs);
    this.serviciosService.getArea().subscribe(areass => this.areas = areass);
   // this.serviciosService.getConsumible().subscribe(consumibless => this.consumibles = consumibless);

   this.serviciosService.getInventario().subscribe(
      resp => {

            this.inventar = resp;


        }
    );

  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }


   onChangeObj(newObj) {
    
     this.serviciosService.getImpresora().subscribe((impresorass:any) => {
     this.impresoras = impresorass.filter(
     (impresorass:any) => impresorass.equipos.id == newObj.id)
     
    
     })

     if (newObj.id == 1){
      this.method = true;
     	this.impre = true;
       this.consum = false;
       
       

     }else if (newObj.id != 1){
     	this.impre = false;
     } if (newObj.id == 2){
       
       this.method = true;
       this.consum = false;
     }if (newObj.id == 4){
       
       this.method = false;
       this.consum = true;
     }

  }


   onChangeObj1(newObj1) {
    
     this.serviciosService.getSubArea().subscribe((subareass:any) => {
     this.subareas = subareass.filter(
     (subareass:any) => subareass.areas.id == newObj1.id)
     
    
     })

    
  }

   changeAccept(){


        if(this.asignada){
        this.inventarios.destino = "Asignada";
        }

         if(this.bodega){
        this.inventarios.destino = "Bodega";
        }

         if(this.mono){
        this.inventarios.caracteristica = "B y N";
        }

         if(this.color){
        this.inventarios.caracteristica = "Color";
        }

        
    }


    changeConsumible(){

       if(this.toner){
        this.serviciosService.getImpresora().subscribe((consumibless:any) =>{
     this.impresoras = consumibless.filter(
     (consumibless:any) => consumibless.tipo == "Toner")
     
    
     })
        
        }

          if(this.imagen){
        this.serviciosService.getImpresora().subscribe((consumibless:any) =>{
     this.impresoras = consumibless.filter(
     (consumibless:any) => consumibless.tipo == "Unidad")
     
    
     })
        
        }

        if(this.fusor){
        this.serviciosService.getImpresora().subscribe((consumibless:any) =>{
     this.impresoras = consumibless.filter(
     (consumibless:any) => consumibless.tipo == "Fusor")
     
    
     })
        
        }

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
            this.inventa =  this.inventar.filter(option => option.serie.toLowerCase() === filterValue);
      
              

                if(this.inventa.length > 0){

                    $(input).parent().addClass('was-validated')
                    input.value = "";
                  
                    swal.fire(
                'No. de Serie repetida!',
                'Esta serie ya esta registrada en el inventario.',
                'error'
              )


                    return;

                }

               }

            }

    }

     /*=============================================
        Validamos la información si este equipo requiere alguna refaccion
        =============================================*/

        if($(input).attr("name") == "refaccion"){

            /*=============================================
            Validamos expresión regular de la información de la tienda
            =============================================*/ 

            let pattern = /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]{1,}$/;

            if(!pattern.test(input.value)){

                $(input).parent().addClass('was-validated');

                input.value = "";

                return;

            }

          }

         /*=============================================
        Validamos la información que no vaya vacio el lugar en la bodega
        =============================================*/

        if($(input).attr("name") == "lugarBodega"){

            /*=============================================
            Validamos expresión regular de la información de la tienda
            =============================================*/ 

            let pattern = /^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]{1,}$/;

            if(!pattern.test(input.value)){

                $(input).parent().addClass('was-validated');

                input.value = "";

                return;

            }

          }

             /*=============================================
        Validamos la información de los procentajes de los consumibles
        =============================================*/

        if($(input).attr("name") == "toner"){

            /*=============================================
            Validamos expresión regular de los procentajes de los consumibles
            =============================================*/ 

            let pattern = /^100$|^\d{0,2}(\.\d{1,2})? *%?$/;


            if(!pattern.test(input.value)){

                $(input).parent().addClass('was-validated');

                input.value = "";

                return;

            }

          }

          if($(input).attr("name") == "consumible1"){

            /*=============================================
            Validamos expresión regular de los procentajes de los consumibles
            =============================================*/ 

            let pattern = /^100$|^\d{0,2}(\.\d{1,2})? *%?$/;

            if(!pattern.test(input.value)){

                $(input).parent().addClass('was-validated');

                input.value = "";

                return;

            }

          }

          if($(input).attr("name") == "consumible2"){

            /*=============================================
            Validamos expresión regular de los procentajes de los consumibles
            =============================================*/ 

            let pattern = /^100$|^\d{0,2}(\.\d{1,2})? *%?$/;

            if(!pattern.test(input.value)){

                $(input).parent().addClass('was-validated');

                input.value = "";

                return;

            }

          }

        /*=============================================
        Validamos el contador de la impresora
        =============================================*/

        if($(input).attr("name") == "contador"){

            /*=============================================
            Validamos expresión regular de los procentajes de los consumibles
            =============================================*/ 

            let pattern = /^[0-9]{1,7}$/;

            if(!pattern.test(input.value)){

                $(input).parent().addClass('was-validated');

                input.value = "";

                return;

            }

          }

}


createInventario(): void {

 let formStore = $(".formStore");

        let error = 0;

        for(let i = 0; i < formStore.length; i++){

            if($(formStore[i]).val() == "" || $(formStore[i]).val() == undefined){

                error++

                $(formStore[i]).parent().addClass("was-validated")

            }
        }

        if(error > 0){

            return;
        }
  

    
    this.serviciosService.createInventario(this.inventarios).subscribe(
        inventarios => {

        this.router.navigate(['/listInvent']);
            swal.fire('Equipo Registrado', 'El artículo se registro de manera correcta al inventario', 'success');
         

        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
}


 updateInventario(): void {
  
  this.serviciosService.updateInventario(this.inventarios)
    .subscribe(
      json => {
        this.router.navigate(['/listInvent']);
        swal.fire('El inventario fue Actualizado', 'El inventario se Actualizó con éxito', 'success');
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
