import { Component, OnInit, Input } from '@angular/core';
import { ImpresorasModel } from '../../models/impresoras.model';
import { VideoService } from './video.service';
import {ServiciosService} from '../../services/servicios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
	@Input() impresora: ImpresorasModel;
	titulo: string = "Video para el cambio de consumible";
	video:string = null;
	url: string = "https://angular.io/api/router/RouterLink";
    urlSafe: SafeResourceUrl;
    vid: boolean = false;

  constructor(public videoService: VideoService, private activatedRoute: ActivatedRoute, private router: Router,
              private serviciosService: ServiciosService,private httpClient: HttpClient,public sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  	if (this.impresora.video != null) {
        this.video = `https://www.youtube.com/embed/${this.impresora.video}?rel=0&autoplay=0 `

  	    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.video);
         this.vid = true;
  	}
  	else{
     this.vid = false;
  	}

  	 
  }

   cerrarPdf() {
    this.videoService.cerrarPDF();
    window.location.reload();
    
  }

}
