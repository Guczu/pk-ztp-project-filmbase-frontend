import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  @Input() asLink = true;
  @Input() fontSize = '3.5rem';
  @Input() cursorPointer = true;
}
