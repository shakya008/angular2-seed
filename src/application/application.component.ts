import {
  Component,
  ViewEncapsulation,
  Inject,
  ApplicationRef,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
/**
 * @class
 * This is the parent component of the project which will be user to drive the project
 */
@Component({
  selector: 'exp-application',
  // Global styles imported in the app component.
  encapsulation: ViewEncapsulation.None,
  template: require('./application.html'),
  styles: [require('./application.css')],
})

export class ApplicationComponent {

  constructor(public router: Router) {
    }
}
