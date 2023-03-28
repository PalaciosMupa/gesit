import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {AreasModel} from '../../models/areas.model';
import {ServiciosService} from '../../services/servicios.service';
import {SubAreasModel} from '../../models/subareas.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formsubarea',
  templateUrl: './formsubarea.component.html',
  styleUrls: ['./formsubarea.component.css']
})
export class FormsubareaComponent implements OnInit {

   @ViewChild(MatSidenav)
  sidenav!: MatSidenav; 
  autenticado:boolean = false;


  public subareas: SubAreasModel = new SubAreasModel();
  areas: AreasModel[];
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
          this.serviciosService.getSubAreasTodos(id).subscribe((subareas) => this.subareas = subareas);
        }
      });


    this.serviciosService.getArea().subscribe(areass => this.areas = areass);


  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }



   createSubArea(): void {

    
    this.serviciosService.createSubArea(this.subareas).subscribe(
        subareas => {

        this.router.navigate(['/listSub']);
            swal.fire('Subarea Registrada', 'La subarea se registro correctamente', 'success');
         

        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }


      updateSubArea(): void {
  
  this.serviciosService.updateSubAreas(this.subareas)
    .subscribe(
      json => {
        this.router.navigate(['/listSub']);
        swal.fire('La Subarea fue Actualizada', 'La Subarea  se ha  Actualizó con éxito', 'success');
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
