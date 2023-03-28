import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {ServiciosService} from '../../services/servicios.service';
import {RepuestosModel} from '../../models/repuestos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import {FormGroup, FormControl} from '@angular/forms';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-listrepue',
  templateUrl: './listrepue.component.html',
  styleUrls: ['./listrepue.component.css']
})
export class ListrepueComponent implements OnInit {


	@ViewChild(MatSidenav)
     sidenav!: MatSidenav;
     repuestos: RepuestosModel[];
     repuesto: RepuestosModel[];
     repu: RepuestosModel[];
     Repuestoss:any[] = [];
     Manto:RepuestosModel[]; 
     repues:  any[] = [];
     Repues: any;
     RepuesSub: any;
     RepuesSubarea: any;
     RepuesEquipo: any;
     RepuesSerie: any;
     suma1:number=0;
     suma2:number=0;
     suma3:number=0;
     pipe = new DatePipe('en-US');
     fechaInicio = null;
     fechaFin = null;
     fechaHoy = null;
     mantos:boolean=false;
     autenticado:boolean = false;
     admin:boolean = false; 

       range = new FormGroup({
      start: new FormControl,
      end: new FormControl
       });

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


   
     this.serviciosService.getRepuesto().subscribe(
      resp => {

        this.repuesto = resp;

        this.repu = this.repuesto.filter(item => 
    
       item.mantto == 1,

      
     );

        let today = new Date();
        this.fechaHoy = this.pipe.transform(today, 'yyyy-MM-dd');

      //  let fechaToday = <any>new Date(this.fechaHoy).setMonth(<any>new Date(this.fechaHoy).getMonth()+0);

        this.Manto = this.repu.filter(items =>
          <any>new Date(items.fechaCambio).setMonth(<any>new Date(items.fechaCambio).getMonth()+4)
           >= <any>new Date(this.fechaHoy).setMonth(<any>new Date(this.fechaHoy).getMonth()+0) &&
            <any>new Date(items.fechaCambio).setHours(<any>new Date(items.fechaCambio).getHours()+2760)
           <= <any>new Date(this.fechaHoy).setMonth(<any>new Date(this.fechaHoy).getMonth()+0) 
          )

        if (this.Manto.length > 0){
          Swal.fire('Mantenimiento', 'Existen equipos que requieren Mantto.', 'info');
          this.mantos = true;    

        }

         

        // Con este codigo organizamos la tabla por fecha de manera descendente
        this.repuestos = resp.sort((a: any, b: any) => <any>new Date(b.fechaCambio) -  <any>new Date(a.fechaCambio));
          
    
     for(let j=0;j<this.repuestos.length;j++){   
       this.suma1 += this.repuestos[j].toner; 
       this.suma2 += this.repuestos[j].unidad; 
       this.suma3 += this.repuestos[j].fusor;
         
  }  

   
  
        }
    );


     

}

   


     Search(){

       this.suma1=0;
       this.suma2=0;
       this.suma3=0;

    if(this.Repues == ""){

    this.ngOnInit();
    }
    else{
 
      this.repuestos = this.repuestos.filter(res => {

        return res.areas.area.toLocaleLowerCase().match(this.Repues.toLocaleLowerCase());
      })

     

     for(let j=0;j<this.repuestos.length;j++){   
       this.suma1 += this.repuestos[j].toner; 
       this.suma2 += this.repuestos[j].unidad;
       this.suma3 += this.repuestos[j].fusor;
         
  }


    }

  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

  SearchSub(){

       this.suma1=0;
       this.suma2=0;
       this.suma3=0;

    if(this.RepuesSubarea == ""){

    this.ngOnInit();
    }
    else{
 
     this.repuestos = this.repuestos.filter(res => {

        return res.subarea.subarea.toLocaleLowerCase().match(this.RepuesSubarea.toLocaleLowerCase());
      })

    

     for(let j=0;j<this.repuestos.length;j++){   
       this.suma1 += this.repuestos[j].toner; 
       this.suma2 += this.repuestos[j].unidad;
       this.suma3 += this.repuestos[j].fusor;
         
  }


    }

  }


  SearchEquipo(){

       this.suma1=0;
       this.suma2=0;
       this.suma3=0;

    if(this.RepuesEquipo == ""){

    this.ngOnInit();
    }
    else{
 
     this.repuestos = this.repuestos.filter(res => {

        return res.equipo.toLocaleLowerCase().match(this.RepuesEquipo.toLocaleLowerCase());
      })

    

     for(let j=0;j<this.repuestos.length;j++){   
       this.suma1 += this.repuestos[j].toner; 
       this.suma2 += this.repuestos[j].unidad;
       this.suma3 += this.repuestos[j].fusor;
         
  }


    }

  }

   SearchSerie(){

       this.suma1=0;
       this.suma2=0;
       this.suma3=0;

    if(this.RepuesSerie == ""){

    this.ngOnInit();
    }
    else{
 
     this.repuestos = this.repuestos.filter(res => {

        return res.serie_equipo.toLocaleLowerCase().match(this.RepuesSerie.toLocaleLowerCase());
      })

    

     for(let j=0;j<this.repuestos.length;j++){   
       this.suma1 += this.repuestos[j].toner; 
       this.suma2 += this.repuestos[j].unidad;
       this.suma3 += this.repuestos[j].fusor;
         
  }


    }

  }


   SearchFecha(){
   

       this.suma1=0;
       this.suma2=0;
       this.suma3=0;

    if(this.range.controls.start.valid && this.range.controls.end.valid && this.range.value.start != null && this.range.value.end != null){
     
       
       this.fechaInicio = this.pipe.transform(this.range.value.start, 'yyyy-MM-dd');
       this.fechaFin = this.pipe.transform(this.range.value.end, 'yyyy-MM-dd');

       console.log("FI",this.fechaInicio);
       console.log("FF",this.fechaFin);

        this.repuestos = this.repuestos.filter(res => {
          console.log("FCambio",res.fechaCambio);
       // return (res.fechaCambio > this.fechaInicio && res.fechaCambio < this.fechaFin);
       return res.fechaCambio >= this.fechaInicio && res.fechaCambio <= this.fechaFin;
      })

         for(let j=0;j<this.repuestos.length;j++){   
       this.suma1 += this.repuestos[j].toner; 
       this.suma2 += this.repuestos[j].unidad;
       this.suma3 += this.repuestos[j].fusor;
         
  }

     

   }
   else{

      this.ngOnInit();
   }

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
