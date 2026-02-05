import { Alumno } from "../../models/alumno";

export interface AlumnoState {
    list: Alumno[];
    loading: boolean;
}

export const initialAlumnosState: AlumnoState = {
    list: [],
    loading: false
}