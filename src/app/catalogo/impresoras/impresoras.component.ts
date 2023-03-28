import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {ServiciosService} from '../../services/servicios.service';
import {ImpresorasModel} from '../../models/impresoras.model';
import {EquiposModel} from '../../models/equipos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-impresoras',
  templateUrl: './impresoras.component.html',
  styleUrls: ['./impresoras.component.css']
})
export class ImpresorasComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav; 
  autenticado:boolean = false;


   public impresoras: ImpresorasModel = new ImpresorasModel();
  equipos: EquiposModel[];
  registrosImpresoras: any[];
  errores: string[];
  consum:boolean=false;
  marca:boolean=false;

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
          this.serviciosService.getImpresorasTodos(id).subscribe((impre) => this.impresoras = impre);
        }
      });


    this.serviciosService.getEquipos().subscribe(equiposs => this.equipos = equiposs);
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }


  onChangeObj(newObj) {
    


     if (newObj.id == 4){
    
       this.consum = true;
       this.marca = false;
       
     }

     if (newObj.id == 1 || newObj.id == 2 ){
    
       this.marca = true;
       this.consum = false;
     }

  }



   createImpresoras(): void {
 
 
    
    this.serviciosService.createImpresora(this.impresoras).subscribe(
        impresoras => {

        this.router.navigate(['/listImpre']);
            swal.fire('Impresora Registrada', 'El modelo de la Impresora se registro correctamente', 'success');
         

        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );


  }

      updateImpresoras(): void {
  
  this.serviciosService.updateImpresoras(this.impresoras)
    .subscribe(
      json => {
        this.router.navigate(['/listImpre']);
        swal.fire('La impresora fue Actualizada', 'El modelo de la Impresora seActualizó con éxito', 'success');
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
