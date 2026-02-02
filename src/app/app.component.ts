import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngreale'; //atributos
  //en esta clase, el js, su funcionalidad, va a aquí
  //métodos
  constructor()
  {
    console.log('En el constructor de AppComponent')
  }
}
