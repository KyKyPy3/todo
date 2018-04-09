import { Component } from '@angular/core';
import { trigger, transition, group, query, style, animate, animateChild, stagger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimation', [
      transition('completed <=> all, active <=> all, active <=> completed', [
        query(':self', style({ height: '*', width: '*' })),
        query(':enter, :leave', style({ position: 'relative' })),
        query(':leave', style({ transform: 'scale(1)' })),
        query(':enter', style({ transform: 'scale(0)' })),
        group([
          query(':leave', group([
            animate('0.4s cubic-bezier(.35,0,.25,1)', style({ transform: 'scale(0)' })), // y: '-100%'
            animateChild()
          ])),
          query(':enter', group([
            animate('0.4s cubic-bezier(.35, 0, .25, 1)', style({ transform: 'scale(1)' })),
            animateChild()
          ]))
        ]),
        query(':self', style({ height: '*', width: '*' })),
      ])
    ])
  ]
})
export class AppComponent {

  prepRouteState(outlet: any) {
    if (outlet.isActivated) {
      return outlet.activatedRoute.data.getValue()['status'] || 'all';
    }
  }

}
