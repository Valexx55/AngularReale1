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
  lista_imcs: Array<Imc>//
  mediaAltura: number = 0;
  mediaPeso: number = 0;
  
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
  this.oimc = new Imc();
  this.lista_imcs = new Array<Imc>();
}

ordenarPorImc(){

  this.lista_imcs.sort(
    (imc1, imc2) => imc1.numerico-imc2.numerico 
  )

}

borrarTablaImc()
{
    this.lista_imcs.length = 0// = new Array<Imc>()
    this.oimc.altura = 0
    this.oimc.numerico = 0
    this.oimc.peso = 0
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
    let nuevoImc:Imc = this.nuevoItemImc(this.oimc)
    this.lista_imcs.push(nuevoImc) //colecciono la lista

    console.table(this.lista_imcs)
    this.mediaPeso = this.obtenerMediaPeso(this.lista_imcs)
    this.mediaAltura = this.obtenerMediaAltura(this.lista_imcs)
    //this.lista_imcs.forEach(i => console.table(i))
    //TODO: 2 funciones 1 calcular la media del peso de la lista 2 la meeida de la altura
    // y lo añadimos a dos nuevas propiedades del Componenet

  }


  nuevoItemImc (imc: Imc): Imc
  {
    let imc_aux: Imc;

      imc_aux = new Imc();
      imc_aux.altura = imc.altura;
      imc_aux.peso = imc.peso;
      imc_aux.numerico = imc.numerico;
      imc_aux.categoria = imc.categoria;
      imc_aux.lectura = imc.lectura;
      imc_aux.foto = imc.foto;


    return imc_aux;
  }

  obtenerMediaAltura(array_imcs: Array<Imc>): number {
    let media: number = 0;
    let total: number = 0;

    //sumo los valores - sumatorio / 
    array_imcs.forEach(item_imc => { total += item_imc.altura });
    //divido entre el nº de elementos
    media = total / array_imcs.length;

    return media;

  }


   obtenerMediaPeso(array_imcs: Array<Imc>): number {
    let media: number = 0;
    let total: number = 0;

    //sumo los valores - sumatorio / 
    array_imcs.forEach(item_imc => { total += item_imc.peso });
    //divido entre el nº de elementos
    media = total / array_imcs.length;

    return media;

  }

  

}
