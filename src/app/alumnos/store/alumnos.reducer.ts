import { createReducer, on } from '@ngrx/store';
import { initialAlumnosState } from './alumnos.state';
import * as AlumnosActions from './alumnos.actions';

export const alumnosReducer = createReducer(
  initialAlumnosState,

  on(AlumnosActions.loadAlumnos, (state) => ({
    ...state,// como el estado es inmutable lo que hacemos es que generan una nueva referencia
    loading: true
  })),

  on(AlumnosActions.loadAlumnosSuccess, (state, { alumnos }) => ({
    ...state,
    loading: false,
    list: alumnos
  })),

  on(AlumnosActions.createAlumnosSuccess, (state, { alumno }) => ({
    ...state,
    list: [...state.list, alumno]
  })),

  on(AlumnosActions.updateAlumnosSuccess, (state, { alumno }) => ({
    ...state,
    list: state.list.map(a => (a.id === alumno.id ? alumno : a))
  })),

  on(AlumnosActions.deleteAlumnosSuccess, (state, { id }) => ({
    ...state,
    list: state.list.filter(a => a.id !== id)
  }))
);
