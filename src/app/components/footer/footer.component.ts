import { Component } from '@angular/core';
import { footerLinks } from './footer-links';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  footerLinks = footerLinks;
}
