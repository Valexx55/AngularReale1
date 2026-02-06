import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter(routes, withComponentInputBinding())]
    }).compileComponents();
  });

    /**
   * 
   * abstract class ComponentFixture {
   *  
     componentInstance;  // access properties and methods
     nativeElement;      // access DOM plantilla
     detectChanges();    // trigger component change detection
}

   */
it('componente raíz creado', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const appc = fixture.componentInstance;
    expect(appc).toBeTruthy();
  });
  

  it('comprobar el titulo de la app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('REALE');
  });

  it('comprobamos alt logo se Angular Logo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const domHtmlComponente = fixture.nativeElement as HTMLElement;//accedo al html
    expect(domHtmlComponente.querySelector('img')?.alt).toMatch("Angular Logo")
    
  });

  it(`actualizmos el título del componente`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.title = "REALE SEGUROS";
    fixture.detectChanges();//activo la reactividad
    const domHtmlComponente = fixture.nativeElement as HTMLElement;//accedo al html
    expect(domHtmlComponente.querySelector('.navbar-brand')?.textContent).toEqual('CURSO ANGULAR REALE SEGUROS');
  });


});
