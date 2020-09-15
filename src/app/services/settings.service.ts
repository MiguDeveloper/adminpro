import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  linkTheme = document.querySelector('#theme');

  get getTema() {
    return localStorage.getItem('tema');
  }

  setLinkTheme(urlTema: string) {
    this.linkTheme.setAttribute('href', urlTema);
  }
  constructor() {
    const urlTheme =
      localStorage.getItem('urlTheme') ||
      './assets/css/colors/default-dark.css';
    const tema = localStorage.getItem('tema') || 'default-dark';
    this.setLinkTheme(urlTheme);
    localStorage.setItem('urlTheme', urlTheme);
    localStorage.setItem('tema', tema);
  }

  setTheme(tema: string) {
    const urlTheme = `./assets/css/colors/${tema}.css`;

    this.setLinkTheme(urlTheme);
    localStorage.setItem('urlTheme', urlTheme);
    localStorage.setItem('tema', tema);
  }
}
