import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import {ServiciosService} from '../services/servicios.service';
import { FormatoService } from '../formato/formato.service';
import Swal from 'sweetalert2';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-formato',
  templateUrl: './formato.component.html',
  styleUrls: ['./formato.component.css']
})
export class FormatoComponent implements OnInit {

	@ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  autenticado:boolean = false;

  cotizacion:boolean = false;
  contrato:boolean = false;
  cambios:boolean = false;
  c12:boolean = false;
  c24:boolean = false;
  c36:boolean = false;
  contrato12:boolean = false;
  contrato24: boolean = false;
  contrato36:  boolean = false;
  cambio12:boolean = false;
  cambio24: boolean = false;
  cambio36:  boolean = false;
  pdf: string = "C12";
  pdfSeleccionado: string = "";

  constructor(private observer: BreakpointObserver, private serviciosService: ServiciosService,
              private activatedRoute: ActivatedRoute, private router: Router,
              public authService: LoginService, private formatoService: FormatoService) { }

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


  }


logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }

  changeCot(){
  if(!this.cotizacion){

       this.c12 = false;
       this.c24 = false;
       this.c36 = false;

        
        }

  }

  changeCon(){

     if(!this.contrato){

       this.contrato12 = false;
       this.contrato24 = false;
       this.contrato36 = false;

        
        }


  }

  changeCam(){


     if(!this.cambios){

       this.cambio12 = false;
       this.cambio24 = false;
       this.cambio36 = false;

        
        }
  }



  changeC12(){

       if(this.c12){

        this.pdf = "C12";
       this.pdfSeleccionado = "C12"

        
        }

         if(this.c24){

        
       this.pdfSeleccionado = "C24"

        
        }

          if(this.c36){

        
       this.pdfSeleccionado = "C36"

        
        }

      
    }

    changeContrato(){

       if(this.contrato12){

        
       this.pdfSeleccionado = "Contrato12"

        
        }

         if(this.contrato24){

        
       this.pdfSeleccionado = "Contrato24"

        
        }

          if(this.contrato36){

        
       this.pdfSeleccionado = "Contrato36"

        
        }
    }

    changeCambio(){

       if(this.cambio12){

        
       this.pdfSeleccionado = "CambioManto"

        
        }

         if(this.cambio24){

        
       this.pdfSeleccionado = "CambioSolicitud"

        
        }

          if(this.cambio36){

        
       this.pdfSeleccionado = "CambioDanio"

        
        }
    }


     abrirModal(pdf: string) {
    
    this.formatoService.abrirFormato();
    
    
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
