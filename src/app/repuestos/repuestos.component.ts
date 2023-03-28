import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {ServiciosService} from '../services/servicios.service';
import {InventarioModel} from '../models/inventario.model';
import {AreasModel} from '../models/areas.model';
import {SubAreasModel} from '../models/subareas.model';
import {RepuestosModel} from '../models/repuestos.model';
import {ConsumibleModel} from '../models/consumible.model';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';
import {map, startWith} from 'rxjs/operators';
import { filter } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.css']
})
export class RepuestosComponent implements OnInit {

  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;
  inventa:  InventarioModel[];
  inventos:  InventarioModel[];
  inventaUpdate:  InventarioModel[];
  areas: AreasModel[];
  subareas: SubAreasModel[];
  in:  any[] = [];
  idInventario: number;
  consumi: ConsumibleModel[];
  consumib: ConsumibleModel[];
  repuestoManto: RepuestosModel[];
  repuestoMantto: RepuestosModel[];
  repuestoManttto: RepuestosModel[];
  consum: ConsumibleModel[]; 
  pipe = new DatePipe('en-US');
  fechaHoy = null;
   autenticado:boolean = false;
   admin:boolean = false; 

  errores: string[];
  id:number;

  serie: string[] = [];
  series: string = "";
  SerieRadio:number;
  Cantidad:number = 0;
  opciones: string;
  Compatible: string = "";
  consumible:boolean=false;
  refaccion:boolean=false;
  toner:boolean=false;
  Contoner:boolean=false;
  Confusor:boolean=false;
  Conimagen:boolean=false;
  Sintoner:boolean=false;
  fusor:boolean=false;
  imagen:boolean=false;
  area:boolean=false;
  asignada: boolean=false;
  bodega: boolean=false;
  mantto: boolean=false;



	   @ViewChild(MatSidenav)
     sidenav!: MatSidenav;
     inventarios: InventarioModel[];
     invent: InventarioModel[];

     public repuestos: RepuestosModel = new RepuestosModel();
     public inventar: InventarioModel[];

   constructor(private observer: BreakpointObserver,private serviciosService: ServiciosService,
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


    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
      
    );


    this.serviciosService.getConsumible().subscribe(
      resp => {

             
            this.consumi = resp;

        }
    );



   

    this.serviciosService.getInventario().subscribe(
      resp => {

             for(const i in resp){

               this.serie[i] = resp[i].serie;  // en lavariable this.serie almaceno todas las series
             }        


            this.inventarios = resp;


        }
    );


     this.serviciosService.getRepuesto().subscribe(
      resp => {

            
            this.repuestoManto = resp;

        }
    );

// Inicia el codigo para tomar el id de la tabla donde aparecen los consumibles

     this.activatedRoute.paramMap.subscribe(params => {
         this.id = +params.get('id');
        if (this.id) {
         console.log("id",this.id);
        

        }
      });


    this.serviciosService.getArea().subscribe(areass => this.areas = areass);

  }

    private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.serie.filter(option => option.toLowerCase().includes(filterValue));
    
  }

  onChangeObj(newObj) {  // con este metodo filtramos los datos de la base de datos
                         // dependiendo lo que traiga la variable newOnj que en este caso es la serie del equipo
    this.inventa = this.inventarios.filter(item => 
    
       item.serie == newObj
     )

    
  
     
   }

    logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

    onChangeObj1(newObj1) {
    
    console.log("Serie",newObj1);

    
  }

   onChangeObj2(newObj2) {
    
     this.serviciosService.getSubArea().subscribe((subareass:any) => {
     this.subareas = subareass.filter(
     (subareass:any) => subareass.areas.id == newObj2.id)
     
    
     })

    
  }

    changeConsumible(){

       if(this.consumible){
         
         console.log("id del inventario",this.inventa[0].id); // aqui viene el id del inventario
         this.repuestos.equipo = this.inventa[0].impresora.modelo;
       }
       else{
      this.Contoner = false;
      this.Sintoner = false;
      this.Confusor = false;
      this.Conimagen= false;

       }
       if(this.refaccion){

         this.repuestos.equipo = this.inventa[0].impresora.modelo;
         
       }

     }

      changeToner(){

       if(this.toner){

         this.in = [];

         this.repuestos.toner = 1;
         this.repuestos.fusor = null;
         this.repuestos.unidad = null;

        this.consumib = this.consumi.filter(item => 
    
       item.impresora.modelo == this.inventa[0].impresora.modelo
        
      ) 

        this.consum = this.consumib.filter(item => 
    
       item.tipo == "Toner"
        
      ) 

         this.inventos = this.inventarios.filter(item => 
    
       item.impresora.modelo == this.consum[0].nombre
        
      ) 

     this.in.push(this.inventos[0]);


         if(this.inventos.length > 0){

             
             this.Contoner = true;
             this.Sintoner = false;

         }

         else {
           this.Compatible = this.consum[0].nombre;
             this.Contoner = false;
             this.Sintoner = true;

         }

       console.log("Consumible",this.consum[0].nombre); 
        // en la variable this.consum[0].nombre traemos el modelo del consumible
        // compatible con el tipo de impresora seleccionado 

       console.log("Inentario",this.inventos);

       // en la variable this.inventos traemos el arreglo de los consumibles disponibles
       // en la base de datos

       this.Cantidad = this.inventos.length;
       this.repuestos.serie_toner = this.inventos[0].serie;
     //  this.repuestos.equipo = this.inventa[0].impresora.modelo;
       this.idInventario = this.inventos[0].id;
      }

      else{
        this.Contoner = false;
      }

    }

   changeFusor(){
      // inicia la logica para llenar la informacion del fusor

       if(this.fusor){

         this.in = [];

           this.repuestos.toner = null;
         this.repuestos.fusor = 1;
         this.repuestos.unidad = null;

        this.consumib = this.consumi.filter(item => 
    
       item.impresora.modelo == this.inventa[0].impresora.modelo
        
      ) 

        this.consum = this.consumib.filter(item => 
    
       item.tipo == "Fusor"
        
      ) 

         this.inventos = this.inventarios.filter(item => 
    
       item.impresora.modelo == this.consum[0].nombre
        
      ) 

         this.in.push(this.inventos[0]);

          if(this.inventos.length > 0){

             this.Confusor = true;
             this.Sintoner = false;

         }

         else {
           this.Compatible = this.consum[0].nombre;
             this.Confusor = false;
             this.Sintoner = true;

         }

       this.Cantidad = this.inventos.length;
       this.repuestos.serie_fusor = this.inventos[0].serie;
      // this.repuestos.equipo = this.inventa[0].impresora.modelo;
       this.idInventario = this.inventos[0].id;
    
      }
      else{
        this.Confusor = false;
      }

    }

    changeImagen(){

      if(this.imagen){

        this.in = [];

          this.repuestos.toner = null;
         this.repuestos.fusor = null;
         this.repuestos.unidad = 1;

        this.consumib = this.consumi.filter(item => 
    
       item.impresora.modelo == this.inventa[0].impresora.modelo
        
      ) 

        this.consum = this.consumib.filter(item => 
    
       item.tipo == "Unidad"
        
      ) 

         this.inventos = this.inventarios.filter(item => 
    
       item.impresora.modelo == this.consum[0].nombre
        
      ) 
         this.in.push(this.inventos[0]);

          if(this.inventos.length > 0){

             this.Conimagen = true;
             this.Sintoner = false;

         }

         else {
           this.Compatible = this.consum[0].nombre;
             this.Conimagen = false;
             this.Sintoner = true;

         }

      this.Cantidad = this.inventos.length;
      this.repuestos.serie_unidad = this.inventos[0].serie;
     // this.repuestos.equipo = this.inventa[0].impresora.modelo;
      this.idInventario = this.inventos[0].id;

    
      }
      else{
      this.Conimagen = false;

      }
      
     

     }


     changeArea(){

       if(this.area){

    this.repuestos.equipo = this.inventa[0].impresora.modelo;

    this.idInventario = this.inventos[0].id;
     }
     }


     changeMantto(){
    if(this.mantto){
      this.repuestos.serie_refaccion = "Se Efectuó Mantenimiento Preventivo";

      this.repuestoManto = this.repuestoManto.filter(item => 
    
       item.serie_equipo == this.inventa[0].serie
        
      ) 

    if(this.repuestoManto[0].mantto == 1){
      
     let today = new Date();
     this.fechaHoy = this.pipe.transform(today, 'yyyy-MM-dd');



      this.repuestoManto[0].fechaCambio = this.fechaHoy;
            

              this.serviciosService.updateRepuesto(this.repuestoManto[0])
              .subscribe(
                json => {
                 
                },
                err => {
                  this.errores = err.error.errors as string[];
                  console.error('Código del error desde el backend: ' + err.status);
                  console.error(err.error.errors);
                }
              )



    }


     if(this.repuestoManto[0].mantto == null){
      this.repuestos.mantto = 1;

    }

    

     }else{
  
     this.repuestos.serie_refaccion = "";
     this.repuestos.mantto = null;
     }

     }



     validate(input){

    

     if($(input).attr("name") == "refacc"){

            /*=============================================
            Validamos expresión regular del campo para la refaccion
            =============================================*/ 

            let pattern = /^[A-Za-zñÑáéíóúÁÉÍÓÚ ]{1,}$/;

            if(!pattern.test(input.value)){

                $(input).addClass('was-validated');

                input.value = "";

                return;

            }

        }

     }

     

     createRepuestos(): void {

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

        if(this.repuestoManto[0].mantto == 1){

           this.router.navigate(['/listRepuesto']);
        swal.fire('Mantenimiento', 'Mantenimiento Registrado', 'success');
         
         
         return;

        }

     
           /*=============================================
            Codigo para actualizar la tabla inventario desde
            el componente de repuestos. 
            =============================================*/ 
        

  
        
          if(this.repuestos.areas != null){

            this.inventa[0].areas = this.repuestos.areas;
            this.inventa[0].subarea = this.repuestos.subarea;

              this.serviciosService.updateInventario(this.inventa[0])
              .subscribe(
                json => {
                 
                },
                err => {
                  this.errores = err.error.errors as string[];
                  console.error('Código del error desde el backend: ' + err.status);
                  console.error(err.error.errors);
                }
              )
        }

      



         let today = new Date();
         this.fechaHoy = this.pipe.transform(today, 'yyyy-MM-dd');


        this.repuestos.fechaCambio = this.fechaHoy;

        if(this.area == false){

        this.repuestos.areas = this.inventa[0].areas;
        this.repuestos.subarea = this.inventa[0].subarea;
        console.log("SIn area")
        }
        

        if(this.repuestos.serie_refaccion != null){

            this.repuestos.refaccion = 1;
        }
        

        this.serviciosService.createRepuesto(this.repuestos).subscribe(
        repuestos => {

        this.router.navigate(['/listRepuesto']);
        swal.fire('Registro Efectuado', 'se realizó el cambio del consumible de manera correcta', 'success');
         

        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );

      
           /*=============================================
            Codigo para eliminar del inentario el consumible cambiado
            =============================================*/ 
         this.serviciosService.deleteInventario(this.idInventario).subscribe(
            () => {
              this.inventarios = this.inventarios.filter(cli => cli !== this.inventos[0])
             
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
