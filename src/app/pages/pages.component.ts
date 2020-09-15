import { SettingsService } from './../services/settings.service';
import { Component, OnInit } from '@angular/core';
declare function customInitFunction();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    customInitFunction();
  }
}
