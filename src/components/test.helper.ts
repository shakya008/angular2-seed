import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[routerLink]',
  /* tslint:disable-next-line */
  host : {
    '(click)': 'onClick()'
  }
})
export class RouterLinkDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}
