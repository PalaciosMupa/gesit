import { Component, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import {ServiciosService} from '../../services/servicios.service';
import {InventarioModel} from '../../models/inventario.model';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav; 

  
  area:boolean = false;
  bode:boolean = false;
  impre:boolean = false;
  autenticado:boolean = false;
      admin:boolean = false; 


  public inventarios: InventarioModel = new InventarioModel();

  public inventar: InventarioModel[];

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
          this.serviciosService.getInventarioTodos(id).subscribe((inven) => 
          	this.inventarios = inven);
        

        this.serviciosService.getInventario().subscribe((impresorass:any) => {
     this.inventar = impresorass.filter(
     (impresorass:any) => impresorass.id == id);
     

   

    if(this.inventar[0].destino == "Asignada"){

     this.area = true;
    }

     if(this.inventar[0].destino == "Bodega"){

     this.bode = true;
    }
     if(this.inventar[0].equipos.tipo == "Impresoras"){

     this.impre = true;
    }


   
     })


        }
      });



 

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
