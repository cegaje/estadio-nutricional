export interface RegistroUsuarioBody {
    nombres: string;
    apePaterno: string;
    apeMaterno: string;
    correoElectronico: string;
    dni: string;
    sexo: string;
    rol: string;
    codigo?: string;
    clave: string;
    fechaNacimiento: string;
}