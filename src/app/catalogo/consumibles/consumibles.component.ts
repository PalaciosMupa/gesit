import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {ServiciosService} from '../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import {ConsumibleModel} from '../../models/consumible.model';
import {ImpresorasModel} from '../../models/impresoras.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-consumibles',
  templateUrl: './consumibles.component.html',
  styleUrls: ['./consumibles.component.css']
})
export class ConsumiblesComponent implements OnInit {


   @ViewChild(MatSidenav)
  sidenav!: MatSidenav; 
  autenticado:boolean = false;


  public consumibless: ConsumibleModel = new ConsumibleModel();
  impresoras: ImpresorasModel[];
 
  errores: string[];



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
          this.serviciosService.getConsumiblesTodos(id).subscribe((consumibles) => this.consumibless = consumibles);
        }
      });


    this.serviciosService.getImpresora().subscribe(impresoras => this.impresoras = impresoras);
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }


 createConsumible(): void {

  
    console.log("Tiposs",this.consumibless.tipo);
    this.serviciosService.createConsumible(this.consumibless).subscribe(
        consumibles => {

        this.router.navigate(['/listConsu']);
            swal.fire('Tipo de Consumible Registrado', 'El Consumible se registro correctamente', 'success');
         

        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }


      updateConsumible(): void {
  
  this.serviciosService.updateConsumible(this.consumibless)
    .subscribe(
      json => {
        this.router.navigate(['/listConsu']);
        swal.fire('El Consumible fue Actualizada', 'El consumible  se ha  Actualizó con éxito', 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    )
  }



}
