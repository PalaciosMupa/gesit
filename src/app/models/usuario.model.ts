// import { RolesModel } from './roles.model';

export class UsuarioModel{
  id: number;
  username: string;
  password: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  cargo: string;
  enable: boolean;
  roles: string[] = [];
//  roles: RolesModel;


}
