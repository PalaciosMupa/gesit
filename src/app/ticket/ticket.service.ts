import { Injectable, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

	private _notificarUpload = new EventEmitter<any>();

  constructor() { }

   get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }
}
