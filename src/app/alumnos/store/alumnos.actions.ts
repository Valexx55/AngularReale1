import { createAction, props } from '@ngrx/store';
import { Alumno } from '../../models/alumno';


export const loadAlumnos = createAction('[Alumnos] Load');

export const loadAlumnosSuccess = createAction
('[Alumnos] Load Success', props<{alumnos:Alumno[]}>());

export const createAlumnosSuccess = createAction
('[Alumnos] Create Success', props<{alumno:Alumno}>());

export const updateAlumnosSuccess = createAction
('[Alumnos] Update Success', props<{alumno:Alumno}>());

export const deleteAlumnosSuccess = createAction
('[Alumnos] Delete Success', props<{id:number}>());

