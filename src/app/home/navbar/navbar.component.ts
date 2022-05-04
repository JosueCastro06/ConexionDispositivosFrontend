import {Component} from '@angular/core';
import {faHome} from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line new-cap
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
// eslint-disable-next-line require-jsdoc
export class NavbarComponent {
  faHome = faHome;
}
