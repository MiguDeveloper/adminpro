import { SettingsService } from './../../services/settings.service';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  links: NodeListOf<Element>;
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme(tema: string) {
    this.settingsService.setTheme(tema);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    this.links.forEach((link) => {
      link.classList.remove('working');
      const nameTheme = link.getAttribute('data-theme');
      if (this.settingsService.getTema === nameTheme) {
        link.classList.add('working');
      }
    });
  }
}
