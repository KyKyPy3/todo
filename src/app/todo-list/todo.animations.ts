import { animation, style, animate } from '@angular/animations';

export const enterAnimation = animation([
  style({ height: 0 }),
  animate('0.3s ease-in', style({ height: '*' }))
]);

export const leaveAnimation = animation([
  animate('0.3s ease-out', style({ transform: 'scale(0)' }))
]);
