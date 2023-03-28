import { Component, OnInit, Input } from '@angular/core';
import { VerpdfService } from './verpdf.service';
import { ImpresorasModel } from '../../models/impresoras.model';
import {ServiciosService} from '../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-verpdf',
  templateUrl: './verpdf.component.html',
  styleUrls: ['./verpdf.component.css']
})
export class VerpdfComponent implements OnInit {
	@Input() impresora: ImpresorasModel;
	titulo: string = "Instructivo para el cambio de consumible";
  path: string= "http://localhost:8080/api/uploadsIns/img/";
  variable: string = "";
   src: any = null;
    filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(public pdfService: VerpdfService, private activatedRoute: ActivatedRoute, private router: Router,
              private serviciosService: ServiciosService,private httpClient: HttpClient) { }

  ngOnInit(): void {

     if(this.impresora.pdf == null || this.impresora.pdf == "" ){
     
      swal.fire('No hay instructivo para esta impresora', 'Sin instructivo', 'info');
     //this.router.navigate(['/listClie']);    

   }
   else{
    
 this.src =`${this.path}${this.impresora.pdf}`; 
 
   
   }

  }

   cerrarPdf() {
    this.pdfService.cerrarPDF();
    window.location.reload();
    
  }

    onDownloadFile(): void {
    this.serviciosService.download(this.src).subscribe(
      event => {
        
        
        console.log(event);
        this.resportProgress(event);
      
        
      },
     
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, 
                  {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
          // saveAs(new Blob([httpEvent.body!], 
          //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          //    httpEvent.headers.get('File-Name'));
        }
        this.fileStatus.status = 'done';
        break;
        default:
          console.log(httpEvent);
          break;
      
    }
  }

   private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

}
