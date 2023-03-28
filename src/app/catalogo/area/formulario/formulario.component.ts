import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {ServiciosService} from '../../../services/servicios.service';
import {AreasModel} from '../../../models/areas.model';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav; 
  autenticado:boolean = false;

  public areass: AreasModel = new AreasModel();

  registrosAreas: any[];
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
          this.serviciosService.getAreasTodos(id).subscribe((areas) => this.areass = areas);
        }
      });




  this.serviciosService.getArea().subscribe(
      resp => {

    this.registrosAreas = resp;
  
        

        }
    );

  }

  logout(): void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }




   createAreas(): void {

    
    this.serviciosService.createArea(this.areass).subscribe(
        areas => {

        this.router.navigate(['/CataArea']);
            swal.fire('Area Registrada', 'El Area se registro correctamente', 'success');
         

        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

     updateArea(): void {
  
  this.serviciosService.updateAreas(this.areass)
    .subscribe(
      json => {
        this.router.navigate(['/CataArea']);
        swal.fire('El Area fue Actualizada', 'El Area  se ha  Actualizó con éxito', 'success');
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
