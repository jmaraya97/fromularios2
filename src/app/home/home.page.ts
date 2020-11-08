import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  validations_form: FormGroup;
  

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { }

  validation_messages = {
    'dni': [
      { type: 'required', message: 'DNI requerido.' },
      { type: 'minlength', message: 'El DNI debe contener 9 caracteres.' },
      { type: 'maxlength', message: 'El DNI debe contener 9 caracteres.' },
      { type: 'pattern', message: 'El DNI debe estar compuesto por 8 numeros y 1 letra.' },
      { type: 'invalidDNI', message: 'Letra no corresponde.' }
    ],
    'nombre': [
      { type: 'required', message: 'El nombre es requerido.' }
    ],
    'apellidos': [
      { type: 'required', message: 'El apellido es requerido.' }
    ],
    'usuario': [
      { type: 'required', message: 'Usuario requerido.' },
      { type: 'minlength', message: 'Usuario debe tener al menos 5 caracteres.' },
      { type: 'maxlength', message: 'Usuario debe tener como mucho 15 caracteres.' },
      { type: 'pattern', message: 'Usuario debe estar compuesto por caracteres o letras y comenzar por una letra.' },
    ],
    'fecha': [
      { type: 'required', message: 'Fecha requerido.' },
      { type: 'minlength', message: 'Fecha debe tener 10 caracteres en formato dd/mm/aaaa.' },
      { type: 'maxlength', message: 'Fecha debe tener 10 caracteres en formato dd/mm/aaaa.' },
      { type: 'pattern', message: 'La fecha debe estar escrita en formato dd/mm/aaaa' },
      { type: 'validaFecha', message: 'Debes ser mayor de edad para ingresar al sitio.' }
    ]
  }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      usuario: new FormControl('', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z]{1}[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      dni: new FormControl('', Validators.compose([
        this.invalidDNI,
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.pattern('^[0-9]{8}[a-zA-Z]$'),
        Validators.required
      ])),
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+[/]{1}[0-9]+[/]{1}[0-9]+$'),
        this.validaFecha
      ]))
    });
  }

  invalidDNI(fc: FormControl) {
    var numero;
    var letra;
    var letraLista;
    var bool = true;
    numero = fc.value.substr(0, fc.value.length - 1);
    letra = fc.value.substr(fc.value.length - 1, 1);
    numero = numero % 23;
    letraLista = 'TRWAGMYFPDXBNJZSQVHLCKET';
    letraLista = letraLista.substring(numero, numero + 1);
    if (letraLista != letra.toUpperCase()) {
      //alert('Dni erroneo, la letra del NIF no se corresponde');
      bool = true;
    } else {
      //alert('Dni correcto');
      bool = false;
    }

    if (bool) {
      return ({ invalidDNI: true });
    } else {
      return (null);
    }
  }

  validaFecha(fc: FormControl) {
    var anio = fc.value.substr(fc.value.length - 4, 4);
    if (2020 - anio < 18) {
      return ({ validaFecha: true });
    } else {
      return (null);
    }
  }

  onSubmit(values) {
    console.log(values);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(values),
        numero: 3
      }
    };
    this.navCtrl.navigateForward('/user', navigationExtras);
  }

}
