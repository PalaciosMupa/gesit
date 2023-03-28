import { UsuarioModel } from './usuario.model';

export class ClientesModel{
id: number;
nombre: string;
direccion: string;
numero_cliente: number;
fechaInicio: string;
contrato: string;
fiscal: string;
identificacion: string;
domicilio: string;
fechaIContrato: string;
fechaFContrato: string;
periodoCont: number;
usuario: UsuarioModel;

}