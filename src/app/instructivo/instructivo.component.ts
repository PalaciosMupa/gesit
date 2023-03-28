import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { VerpdfService } from './verpdf/verpdf.service';
import { VideoService } from './video/video.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ModaleService } from './pdfinstructivo/modale.service';
import {ServiciosService} from '../services/servicios.service';
import {ImpresorasModel} from '../models/impresoras.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructivo',
  templateUrl: './instructivo.component.html',
  styleUrls: ['./instructivo.component.css']
})
export class InstructivoComponent implements OnInit {
	@ViewChild(MatSidenav)
  sidenav!: MatSidenav; 
  impres: ImpresorasModel[];
  impreso: ImpresorasModel[]; 
  Modelo: any;
  ImpresoraSeleccionada: ImpresorasModel;
  ImpresoraSeleccionad: ImpresorasModel;
  ImpresoraSelecciona: ImpresorasModel;
  
  autenticado:boolean = false;

  constructor(private observer: BreakpointObserver, private serviciosService: ServiciosService, private verpdfService: VerpdfService,
              private activatedRoute: ActivatedRoute, private router: Router, private modaleService: ModaleService, private videoService: VideoService,
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

     this.serviciosService.getImpresora().subscribe(
      resp => {

        this.impres = resp;

        this.impreso = this.impres.filter(item => 
    
       item.equipos.tipo == "Impresoras"

      
     );
    });
  
}

Search(){

       

    if(this.Modelo == ""){

    this.ngOnInit();
    }
    else{
 
      this.impreso = this.impreso.filter(res => {

        return res.modelo.toLocaleLowerCase().match(this.Modelo.toLocaleLowerCase());
      })

     



    }

  }

   abrirModal(impresora: ImpresorasModel) {
    this.ImpresoraSeleccionada = impresora;
    this.modaleService.abrirModal();
  }

     abrirPdf(impresora: ImpresorasModel) {
      
    this.ImpresoraSeleccionad = impresora;
    this.verpdfService.abrirPDF();
  }

     abrirVideo(impresora: ImpresorasModel) {
      
    this.ImpresoraSelecciona = impresora;
    this.videoService.abrirPDF();
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    Swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
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
