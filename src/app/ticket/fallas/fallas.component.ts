import { Component, OnInit, Input } from '@angular/core';
import { ImpresorasModel } from '../../models/impresoras.model';
import { FallaService } from './falla.service';
import {ServiciosService} from '../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-fallas',
  templateUrl: './fallas.component.html',
  styleUrls: ['./fallas.component.css']
})
export class FallasComponent implements OnInit {
@Input() impresora: ImpresorasModel;
@Input() atasco: boolean;
   @Input() mancha: boolean;
   @Input() config: boolean;
   @Input() rayas: boolean;
   @Input() escanea: boolean;
   @Input() impre: boolean;
	titulo: string = "Fallas Recurrentes";
	video:string = null;
     urlSafe: SafeResourceUrl;
     vid: boolean = false;

  constructor(public fallaService: FallaService, private activatedRoute: ActivatedRoute, private router: Router,
              private serviciosService: ServiciosService,private httpClient: HttpClient,public sanitizer: DomSanitizer) 
 { }

  ngOnInit(): void {
  	

 if(this.atasco){

      
      if(this.impresora.atasco == null || this.impresora.atasco == "" ){
     
      swal.fire('Sin video', 'No se ha cargado el video', 'info');
     //this.router.navigate(['/listClie']);    
this.vid = false;
   }
   else{
    
 this.video = `https://www.youtube.com/embed/${this.impresora.atasco}?rel=0&autoplay=0 `

  	    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.video);       
        this.vid = true;
   }

}

 if(this.mancha){

      
      if(this.impresora.mancha == null || this.impresora.mancha == "" ){
     
      swal.fire('Sin video', 'No se ha cargado el video', 'info');
     //this.router.navigate(['/listClie']);    
this.vid = false;
   }
   else{
    
 this.video = `https://www.youtube.com/embed/${this.impresora.mancha}?rel=0&autoplay=0 `

  	    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.video);       
   this.vid = true;
   }

}

 if(this.config){

      
      if(this.impresora.configurar == null || this.impresora.configurar == "" ){
     
      swal.fire('Sin video', 'No se ha cargado el video', 'info');
     //this.router.navigate(['/listClie']);    
this.vid = false;
   }
   else{
    
 this.video = `https://www.youtube.com/embed/${this.impresora.configurar}?rel=0&autoplay=0 `

  	    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.video);       
   this.vid = true;
   }

}

 if(this.rayas){

      
      if(this.impresora.raya == null || this.impresora.raya == "" ){
     
      swal.fire('Sin video', 'No se ha cargado el video', 'info');
     //this.router.navigate(['/listClie']);    
this.vid = false;
   }
   else{
    
 this.video = `https://www.youtube.com/embed/${this.impresora.raya}?rel=0&autoplay=0 `

  	    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.video);       
   this.vid = true;
   }

}

 if(this.escanea){

      
      if(this.impresora.escaneo == null || this.impresora.escaneo == "" ){
     
      swal.fire('Sin video', 'No se ha cargado el video', 'info');
     //this.router.navigate(['/listClie']);    
this.vid = false;
   }
   else{
    
 this.video = `https://www.youtube.com/embed/${this.impresora.escaneo}?rel=0&autoplay=0 `

  	    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.video);       
   this.vid = true;
   }

}

 if(this.impre){

      
      if(this.impresora.imprime == null || this.impresora.imprime == "" ){
     
      swal.fire('Sin video', 'No se ha cargado el video', 'info');
     //this.router.navigate(['/listClie']);    
this.vid = false;
   }
   else{
    
 this.video = `https://www.youtube.com/embed/${this.impresora.imprime}?rel=0&autoplay=0 `

  	    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.video);       
   this.vid = true;
   }

}


  }

    cerrarPdf() {
    this.fallaService.cerrarPDF();
    window.location.reload();
    
  }

}
