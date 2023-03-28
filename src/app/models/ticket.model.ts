import { UsuarioModel } from './usuario.model';

export class TicketModel{

	id: number;
	serie: string;
    falla: string;
    imagen: string;
    nombre: string;
    apellido: string;
    telefono1: string;
    telefono2: string;
    ubicacion: string;
    ubicacion2: string;
    fechaInicio: string;
    fechaCierre: string;
    horaI: string;
    horaCierre: string;
    usuario: UsuarioModel;



}