import { Component } from '@angular/core';
import { Imc } from '../../models/imc';
import { TipoImc } from '../../models/tipo-imc';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-imc',
  imports: [FormsModule],
  templateUrl: './imc.component.html',
  styleUrl: './imc.component.css'
})
export class ImcComponent {

  titulo: string = "CALCULO DEL IMC";
  // peso:number;
  // altura:number;
  // imc:number;
  oimc: Imc;
  
  static readonly FOTO_DESNUTRIDO: string = "/desnutrido.jpg";
  static readonly FOTO_DELGADO: string = "/delgado.jpg";
  static readonly FOTO_IDEAL: string = "/ideal.jpg";
  static readonly FOTO_SOBREPESO: string = "/sobrepeso.jpg";
  static readonly FOTO_OBESO: string = "/obeso.jpg";

  /*

   * Haced una APP que calcule el Índice de Masa Corporal de una persona
   * la fórmula es la siguiente:
   * 
   *  IMC = peso (kg) / altura * altura(m)
   * 
   * si el imc < 16 - DESNUTRIDO
   * si el imc >=16 y < 18 - DELGADO
   * si el imc >=18 Y < 25 - IDEAL
   * si el imc >=25 y < 31 - SOBREPESO
   * si el imc >=31 - OBESO
   * 
   * hay que informar al usuario de su valor numérico
   * y de su valor nominal (categoría)
   * 
   * //opcional: buscad una foto/imagen/dibujo reprsentativo de cada
   * estado/resultado (delgado, etc) y ubicarla en la carpeta public
   * 
  */

constructor ()
{
  this.oimc = new Imc()
}

  calcularIMC() {
    console.log("calcular imc boton tocado");
    this.oimc.numerico = this.oimc.peso / (this.oimc.altura * this.oimc.altura);
    //casting de String a numero
    this.oimc.numerico = + this.oimc.numerico.toFixed(2);
    //this.oimc.numerico = parseFloat(this.oimc.numerico.toFixed(2));
    if (this.oimc.numerico < 16) {
      //desnutrido
      this.oimc.categoria = TipoImc.DESNUTRIDO;
      this.oimc.lectura = TipoImc[TipoImc.DESNUTRIDO];
      this.oimc.foto = ImcComponent.FOTO_DESNUTRIDO;
    } else if (this.oimc.numerico >= 16 && this.oimc.numerico < 18) {
      //delgado
      this.oimc.categoria = TipoImc.DELGADO;
      this.oimc.lectura = TipoImc[TipoImc.DELGADO];
      this.oimc.foto = ImcComponent.FOTO_DELGADO;
    } else if (this.oimc.numerico >= 18 && this.oimc.numerico < 25) {
      //ideal
      this.oimc.categoria = TipoImc.IDEAL;
      this.oimc.lectura = TipoImc[TipoImc.IDEAL];
      this.oimc.foto = ImcComponent.FOTO_IDEAL;
    } else if (this.oimc.numerico >= 25 && this.oimc.numerico < 31) {
      //soberpeso
      this.oimc.categoria = TipoImc.SOBREPESO;
      this.oimc.lectura = TipoImc[TipoImc.SOBREPESO];
      this.oimc.foto = ImcComponent.FOTO_SOBREPESO;
    } else if (this.oimc.numerico >= 31) {
      //obeso
      this.oimc.categoria = TipoImc.OBESO;//orden
      this.oimc.lectura = TipoImc[TipoImc.OBESO];//accedo al Enumerado como String
      this.oimc.foto = ImcComponent.FOTO_OBESO;

    }
  }

}
