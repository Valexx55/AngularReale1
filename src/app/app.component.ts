import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'REALE'; //atributos
  //en esta clase, el js, su funcionalidad, va a aquí
  //métodos
  constructor()
  {
    console.log('En el constructor')
    //this.title = 'ng reale 2'
  }
}
