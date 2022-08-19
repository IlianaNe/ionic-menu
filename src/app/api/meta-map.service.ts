import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MetaMapService {

  private url = 'https://api.getmati.com/';
  private client_id = '5e94a3c0aac162001b1c892c';
  private idFlow = '62fbc517d106dd001dfca192'
  private client_secret = 'W63XVFG5UB84J6FYQV6N7159BVA5UN43';
  private client_credentials = '';
  userToken: string;
  identity: string;
  id: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  base64Client() {
    const clientCredentials = this.client_id + ':' + this.client_secret;
    this.client_credentials = btoa(clientCredentials);
  }

  getToken() {

    this.base64Client();

    const body = new HttpParams().set('grant_type', 'client_credentials');

    const headers =
    {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + this.client_credentials
    };

    this.http.post(`${this.url}oauth`, body.toString(), { headers }).subscribe(
      (response) => {                           //Next callback
        this.guardarToken(response['access_token']);
        console.log(response)
      },
      (error) => {                              //Error callback
        console.error(error)
      });
  }

  leerToken() {//método para leer lo que hay en el token
    //verificar si hay informacion
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';//retornamos un string vacío
    }
    return this.userToken;
  }

  private guardarToken(idToken: string) { //método para guardar el token que es el que almacena el inicio de sesion
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  newUser() {
    //const body = new HttpParams().set('flowId', this.idFlow);
    const token = this.leerToken();
    const headers =
    {
      Accept: 'application/json',
      'x-forwarded-for': '187.190.146.96',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const body = {
      flowId: '62fbc517d106dd001dfca192'
    }

    this.http.post(`${this.url}v2/verifications/`, body, { headers }).subscribe(
      (response) => {                           //Next callback
        this.identity = response['identity'];
        this.id = response['id'];
        console.log(response);
      },
      (error) => {                              //Error callback
        console.error(error)
      });
  }

  newDocuments() {
    //const body = new HttpParams().set('flowId', this.idFlow);
    const token = this.leerToken();

    const form = new FormData();
    form.append('inputType', 'document-photo');
    form.append('document', 'data:image/png;name=prueba.PNG;base64,iVBORw0KGgoAAAANSUhEUgAAAWQAAADjCAYAAACy2W70AAAAAXNSR0I');


    const headers =
    {
      Accept: 'application/json',
      'Authorization': 'Bearer ' + token
    };

    this.http.post(`${this.url}v2/identities/${this.identity}/send-input`, form, { headers }).subscribe(
      (response) => {                           //Next callback
        console.log(response);
      },
      (error) => {                              //Error callback
        console.error(error);
      });
  }


  getUser() {
    //const body = new HttpParams().set('flowId', this.idFlow);
    const token = this.leerToken();
    const headers =
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };

    this.http.get(`${this.url}v2/verifications/${this.id}`, { headers }).subscribe(
      (response) => {                           //Next callback
        console.log(response)
      },
      (error) => {                              //Error callback
        console.error(error)
      });
  }

  verificationStatus() {
    //const body = new HttpParams().set('flowId', this.idFlow);
    const token = this.leerToken();
    const headers =
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const body = {
      status: 'rejected'
    }

    this.http.put(`${this.url}v2/verifications/${this.id}/status`,body, { headers }).subscribe(
      (response) => {                           //Next callback
        console.log(response)
        console.log('Cambiado')
      },
      (error) => {                              //Error callback
        console.error(error)
      });
  }


  deleteUser() {
    //const body = new HttpParams().set('flowId', this.idFlow);
    const token = this.leerToken();
    const headers =
    {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
    const body = {
      status: 'deleted'
    }

    this.http.put(`${this.url}v2/verifications/${this.id}/status`,body, { headers }).subscribe(
      (response) => {                           //Next callback
        console.log(response)
        console.log('Cambiado')
      },
      (error) => {                              //Error callback
        console.error(error)
      });
  }
}



