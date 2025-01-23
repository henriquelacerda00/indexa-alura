import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from './componentes/container/container.component';
import { CabecalhoComponent } from "./componentes/cabecalho/cabecalho.component";
import { SeparadorComponent } from './componentes/separador/separador.component';
import { ContatoComponent } from './componentes/contato/contato.component';
import { FormsModule } from '@angular/forms';

interface Contato{
  id:number
  nome:string
  telefone:string
}
import agenda from './agenda.json'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    ContainerComponent, 
    CabecalhoComponent , 
    SeparadorComponent,
    ContatoComponent,
    FormsModule
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  alfabeto:string = 'abcdefghijklmnopqrstuvwxyz'
  contatos : Contato[] = agenda

  filtrarTexto:string = ''

  filtrarAcentos(texto:string):string{
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
  }

  filtrarContatosPorTexto(): Contato[]{
    return this.contatos.filter(contato => {
      return this.filtrarAcentos(contato.nome).toLowerCase().includes(this.filtrarAcentos(this.filtrarTexto.toLowerCase()));
    })
  }

  filtrarContatos(letra:string): Contato[]{
    return this.filtrarContatosPorTexto().filter(contato => {
      return this.filtrarAcentos(contato.nome).toLowerCase().startsWith(this.filtrarAcentos(letra).toLowerCase())
    })
  }

}
