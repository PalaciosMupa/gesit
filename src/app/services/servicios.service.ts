import { Injectable } from '@angular/core';
import {ClientesModel} from '../models/clientes.model';
import {AreasModel} from '../models/areas.model';
import {CuentaModel} from '../models/cuenta.model';
import {SubAreasModel} from '../models/subareas.model';
import {ImpresorasModel} from '../models/impresoras.model';
import {InventarioModel} from '../models/inventario.model';
import {RepuestosModel} from '../models/repuestos.model';
import {ConsumibleModel} from '../models/consumible.model';
import {EquiposModel} from '../models/equipos.model';
import {UsuarioModel} from '../models/usuario.model';
import {TicketModel} from '../models/ticket.model';
import {RolesModel} from '../models/roles.model';
import {UsuarioRolModel} from '../models/usuariorol.model';
import {Observable, throwError } from 'rxjs';
import { LoginService } from '../services/login.service';
import { map, catchError} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import {HttpClient, HttpHeaders, HttpEvent, HttpRequest} from '@angular/common/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';



@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  clientes: ClientesModel[];
  areas: AreasModel[];
  subareas: SubAreasModel[];
  impresoras: ImpresorasModel[];
  consumibles: ConsumibleModel[];
  cuentas: CuentaModel[];
  equipos: EquiposModel[];
  inventarios: InventarioModel[];
  repuestos:RepuestosModel[];
  usuario:UsuarioModel[];
  rol:RolesModel[];
  UsuarioRol:UsuarioRolModel[];
  TicketModel: TicketModel[];

 

  private EndPointCliente: string = 'http://localhost:8080/api/cliente';
  private EndPointAreas: string = 'http://localhost:8080/api/area';
  private EndPointSubAreas: string = 'http://localhost:8080/api/subarea';
  private EndPointImpresoras: string = 'http://localhost:8080/api/impresora';
  private EndPointConsumible: string = 'http://localhost:8080/api/consumible';
  private EndPointCuenta: string = 'http://localhost:8080/api/cuenta';
  private EndPointEquipos: string = 'http://localhost:8080/api/equipos';
  private EndPointInventario: string = 'http://localhost:8080/api/inventario';
  private EndPointRepuesto: string = 'http://localhost:8080/api/repuesto';
  private EndPointUsuario: string = 'http://localhost:8080/api/usua';
  private EndPointRol: string = 'http://localhost:8080/api/rol';
  private EndPointUsuarioRol: string = 'http://localhost:8080/api/usuarioRol';
  private EndPointTicket: string = 'http://localhost:8080/api/ticket';
  private EndPointEmail: string = 'http://localhost:8080/api/email';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router,
    private authService: LoginService) { }


    private agregarAuthorizationHeader() {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e): boolean {
    if (e.status == 401) {

      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }

    if (e.status == 403) {
      swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
      this.router.navigate(['/listClie']);
      return true;
    }
    return false;
  }


exportToExcel(json: any[], excelFileName: string): void {

const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
const workbook: XLSX.WorkBook = {

  Sheets: { 'data': worksheet},
  SheetNames:['data']
};
const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
  // llamada del metodo buffer y arreglo de datos
  this.saveAsExcel(excelBuffer, excelFileName);
}

private saveAsExcel(buffer:  any, fileName: string): void{
const data:  Blob = new Blob([ buffer ], { type: EXCEL_TYPE });
FileSaver.saveAs(data, fileName + '_ESIT_' + new Date().getTime() + EXCEL_EXT);

}


 getCliente(): Observable<ClientesModel[]> {
   return this.http.get<ClientesModel[]>(this.EndPointCliente);
}

  getArea(): Observable<AreasModel[]> {
   return this.http.get<AreasModel[]>(this.EndPointAreas);
 }

  getEquipos(): Observable<EquiposModel[]> {
   return this.http.get<EquiposModel[]>(this.EndPointEquipos);
 }

   getSubArea(): Observable<SubAreasModel[]> {
   return this.http.get<SubAreasModel[]>(this.EndPointSubAreas);
 }

   getImpresora(): Observable<ImpresorasModel[]> {
   return this.http.get<ImpresorasModel[]>(this.EndPointImpresoras);
 }

 getConsumible(): Observable<ConsumibleModel[]> {
   return this.http.get<ConsumibleModel[]>(this.EndPointConsumible);
 }


  getCuenta(): Observable<CuentaModel[]> {
   return this.http.get<CuentaModel[]>(this.EndPointCuenta);
 }

 getInventario(): Observable<InventarioModel[]> {
   return this.http.get<InventarioModel[]>(this.EndPointInventario);
 }


 getRepuesto(): Observable<RepuestosModel[]> {
   return this.http.get<RepuestosModel[]>(this.EndPointRepuesto);
 }

getUsuario(): Observable<UsuarioModel[]> {
   return this.http.get<UsuarioModel[]>(this.EndPointUsuario);
 }

 getRol(): Observable<RolesModel[]> {
   return this.http.get<RolesModel[]>(this.EndPointRol);
 }

 getUsuarioRol(): Observable<UsuarioRolModel[]> {
   return this.http.get<UsuarioRolModel[]>(this.EndPointUsuarioRol);
 }

 getTicket(): Observable<TicketModel[]> {
   return this.http.get<TicketModel[]>(this.EndPointTicket);
 }

  // define function to download files
  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${filename}/`, { headers: this.agregarAuthorizationHeader(), 
     reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  subirImpresora(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.EndPointImpresoras}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

  }
  

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.EndPointCliente}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

  }

    subirFotoTicket(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.EndPointTicket}/upload`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

  }

    subirFiscal(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.EndPointCliente}/uploadF`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

  }

   subirIdentif(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.EndPointCliente}/uploadI`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

  }

     subirDom(archivo: File, id): Observable<HttpEvent<{}>> {

    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    const req = new HttpRequest('POST', `${this.EndPointCliente}/uploadD`, formData, {
      reportProgress: true,
      headers: httpHeaders
    });

    return this.http.request(req).pipe(
      catchError(e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

  }



getUsuarioRolTodos(id): Observable<UsuarioRolModel> {
return this.http.get<UsuarioRolModel>(`${this.EndPointUsuarioRol}/${id}`,{ headers: this.agregarAuthorizationHeader() })
.pipe(
catchError(e => {
 this.router.navigate(['/listRol']);
 console.error(e.error.mensaje);
 swal.fire('Error al editar', e.error.mensaje, 'error');
 return throwError(e);
})
);
}

getTicketTodos(id): Observable<TicketModel> {
return this.http.get<TicketModel>(`${this.EndPointTicket}/${id}`,{ headers: this.agregarAuthorizationHeader() })
.pipe(
catchError(e => {
 this.router.navigate(['/listRol']);
 console.error(e.error.mensaje);
 swal.fire('Error al editar', e.error.mensaje, 'error');
 return throwError(e);
})
);
}

getClienteTodos(id): Observable<ClientesModel> {
return this.http.get<ClientesModel>(`${this.EndPointCliente}/${id}`,{ headers: this.agregarAuthorizationHeader() })
.pipe(
catchError(e => {
 this.router.navigate(['/listClie']);
 console.error(e.error.mensaje);
 swal.fire('Error al editar', e.error.mensaje, 'error');
 return throwError(e);
})
);
}


getAreasTodos(id): Observable<AreasModel> {
return this.http.get<AreasModel>(`${this.EndPointAreas}/${id}`,{ headers: this.agregarAuthorizationHeader() })
.pipe(
catchError(e => {
 this.router.navigate(['/CataArea']);
 console.error(e.error.mensaje);
 swal.fire('Error al editar', e.error.mensaje, 'error');
 return throwError(e);
})
);
}


getSubAreasTodos(id): Observable<SubAreasModel> {
return this.http.get<SubAreasModel>(`${this.EndPointSubAreas}/${id}`,{ headers: this.agregarAuthorizationHeader() })
.pipe(
catchError(e => {
 this.router.navigate(['/CataArea']);
 console.error(e.error.mensaje);
 swal.fire('Error al editar', e.error.mensaje, 'error');
 return throwError(e);
})
);
}

getConsumiblesTodos(id): Observable<ConsumibleModel> {
return this.http.get<ConsumibleModel>(`${this.EndPointConsumible}/${id}`,{ headers: this.agregarAuthorizationHeader() })
.pipe(
catchError(e => {
 this.router.navigate(['/listConsu']);
 console.error(e.error.mensaje);
 swal.fire('Error al editar', e.error.mensaje, 'error');
 return throwError(e);
})
);
}

getCuentasTodos(id): Observable<CuentaModel> {
return this.http.get<CuentaModel>(`${this.EndPointCuenta}/${id}`,{ headers: this.agregarAuthorizationHeader() })
.pipe(
catchError(e => {
 this.router.navigate(['/listCuen']);
 console.error(e.error.mensaje);
 swal.fire('Error al editar', e.error.mensaje, 'error');
 return throwError(e);
})
);
}

  getInventarioTodos(id): Observable<InventarioModel> {
    return this.http.get<InventarioModel>(`${this.EndPointInventario}/${id}`,{ headers: this.agregarAuthorizationHeader() })
    .pipe(
    catchError(e => {
     this.router.navigate(['/listInvent']);
     console.error(e.error.mensaje);
     swal.fire('Error al editar', e.error.mensaje, 'error');
     return throwError(e);
    })
    );
  }


 getRepuestoTodos(id): Observable<RepuestosModel> {
    return this.http.get<RepuestosModel>(`${this.EndPointRepuesto}/${id}`,{ headers: this.agregarAuthorizationHeader() })
    .pipe(
    catchError(e => {
     this.router.navigate(['/listRepuesto']);
     console.error(e.error.mensaje);
     swal.fire('Error al editar', e.error.mensaje, 'error');
     return throwError(e);
    })
    );
  }

getImpresorasTodos(id): Observable<ImpresorasModel> {
  return this.http.get<ImpresorasModel>(`${this.EndPointImpresoras}/${id}`,{ headers: this.agregarAuthorizationHeader() })
  .pipe(
    catchError(e => {
     this.router.navigate(['/listImpre']);
     console.error(e.error.mensaje);
     swal.fire('Error al editar', e.error.mensaje, 'error');
     return throwError(e);
    })
  );
}

createCliente(client: ClientesModel): Observable<ClientesModel> {
       return this.http.post(this.EndPointCliente, client, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.client as ClientesModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }


     createArea(areas: AreasModel): Observable<AreasModel> {
       return this.http.post(this.EndPointAreas, areas, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.areas as AreasModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }



     createSubArea(subareas: SubAreasModel): Observable<SubAreasModel> {
       return this.http.post(this.EndPointSubAreas, subareas, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.subareas as SubAreasModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }


       createCuenta(cuentas: CuentaModel): Observable<CuentaModel> {
       return this.http.post(this.EndPointCuenta, cuentas, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.cuentas as CuentaModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }


      createUsuarioRol(usuariorol: UsuarioRolModel): Observable<UsuarioRolModel> {
       return this.http.post(this.EndPointUsuarioRol, usuariorol, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.usuariorol as UsuarioRolModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }

        createTicket(ticket: TicketModel): Observable<TicketModel> {
       return this.http.post(this.EndPointTicket, ticket, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.ticket as TicketModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }

      sendEmail(ticket: TicketModel): Observable<TicketModel> {
       return this.http.post(this.EndPointEmail, ticket, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.ticket as TicketModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }


      createUsuario(usuarios: UsuarioModel): Observable<UsuarioModel> {
       return this.http.post(this.EndPointUsuario, usuarios, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.usuarios as UsuarioModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }


      createInventario(inventarios: InventarioModel): Observable<InventarioModel> {
       return this.http.post(this.EndPointInventario, inventarios, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.inventarios as InventarioModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }



      createRepuesto(repuestos: RepuestosModel): Observable<RepuestosModel> {
       return this.http.post(this.EndPointRepuesto, repuestos, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.repuestos as RepuestosModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }



        createConsumible(consumibles: ConsumibleModel): Observable<ConsumibleModel> {
       return this.http.post(this.EndPointConsumible, consumibles, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.consumibles as ConsumibleModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }


      createImpresora(impresoras: ImpresorasModel): Observable<ImpresorasModel> {
       return this.http.post(this.EndPointImpresoras, impresoras, { headers: this.agregarAuthorizationHeader() })
         .pipe(
           map((response: any) => response.impresoras as ImpresorasModel),
           catchError(e => {

             if (e.status == 400) {
               return throwError(e);
             }

             swal.fire(e.error.mensaje, e.error.error, 'error');
             return throwError(e);
           })
         );
     }

     updateCliente(client: ClientesModel): Observable<any> {
  return this.http.put<any>(`${this.EndPointCliente}/${client.id}`, client, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}

     updateAreas(areas: AreasModel): Observable<any> {
      return this.http.put<any>(`${this.EndPointAreas}/${areas.id}`, areas, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}

     updateSubAreas(subareas: SubAreasModel): Observable<any> {
  return this.http.put<any>(`${this.EndPointSubAreas}/${subareas.id}`, subareas, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}


    updateCuentas(cuentas: CuentaModel): Observable<any> {
     return this.http.put<any>(`${this.EndPointCuenta}/${cuentas.id}`, cuentas, { headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}

 updateUsuarioRol(usuariorol: UsuarioRolModel): Observable<any> {
     return this.http.put<any>(`${this.EndPointUsuarioRol}/${usuariorol.id}`, usuariorol, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}


 updateTicket(ticket: TicketModel): Observable<any> {
     return this.http.put<any>(`${this.EndPointTicket}/${ticket.id}`, ticket, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}

// ojo aqui porque esta pasando por id en la variable inventarios.id

updateInventario(inventarios: InventarioModel): Observable<any> {
     return this.http.put<any>(`${this.EndPointInventario}/${inventarios.id}`, inventarios, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}


updateInventa(id: number, inventarios: InventarioModel): Observable<any> {
     return this.http.put<any>(`${this.EndPointInventario}/${id}`, inventarios, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}

updateRepuesto(repuestos: RepuestosModel): Observable<any> {
     return this.http.put<any>(`${this.EndPointRepuesto}/${repuestos.id}`, repuestos, { headers: this.agregarAuthorizationHeader() }).pipe(
      catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}

    updateConsumible(consumibles: ConsumibleModel): Observable<any> {
  return this.http.put<any>(`${this.EndPointConsumible}/${consumibles.id}`, consumibles, { headers: this.agregarAuthorizationHeader()}).pipe(
    catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}

     updateImpresoras(impresoras: ImpresorasModel): Observable<any> {
  return this.http.put<any>(`${this.EndPointImpresoras}/${impresoras.id}`, impresoras, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}

     updateUsuarioR(usuarios: UsuarioModel): Observable<any> {
  return this.http.put<any>(`${this.EndPointUsuario}/${usuarios.id}`, usuarios, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {

      if (e.status == 400) {
        return throwError(e);
      }

      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}




deleteCliente(id: number): Observable<ClientesModel> {
  return this.http.delete<ClientesModel>(`${this.EndPointCliente}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}  

deleteAreas(id: number): Observable<AreasModel> {
  return this.http.delete<AreasModel>(`${this.EndPointAreas}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}  

deleteSubAreas(id: number): Observable<SubAreasModel> {
  return this.http.delete<SubAreasModel>(`${this.EndPointSubAreas}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}  

deleteCuentas(id: number): Observable<CuentaModel> {
  return this.http.delete<CuentaModel>(`${this.EndPointCuenta}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}  

deleteUsuarioRol(id: number): Observable<UsuarioRolModel> {
  return this.http.delete<UsuarioRolModel>(`${this.EndPointUsuarioRol}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}  

deleteTicket(id: number): Observable<TicketModel> {
  return this.http.delete<TicketModel>(`${this.EndPointTicket}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
} 

deleteInventario(id: number): Observable<InventarioModel> {
  return this.http.delete<InventarioModel>(`${this.EndPointInventario}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}  

deleteRepuesto(id: number): Observable<RepuestosModel> {
  return this.http.delete<RepuestosModel>(`${this.EndPointRepuesto}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}  



deleteConsumible(id: number): Observable<ConsumibleModel> {
  return this.http.delete<ConsumibleModel>(`${this.EndPointConsumible}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
}  


deleteImpresoras(id: number): Observable<ImpresorasModel> {
  return this.http.delete<ImpresorasModel>(`${this.EndPointImpresoras}/${id}`, { headers: this.agregarAuthorizationHeader() }).pipe(
    catchError(e => {
      console.error(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.error, 'error');
      return throwError(e);
    })
  );
} 


}
