// src/app/animations/animations.ts
import {
  trigger,
  style,
  animate,
  transition,
  state
} from '@angular/animations';

/**
 * Fades in + slides up on enter
 */
export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(18px)' }),
    animate(
      '420ms cubic-bezier(.2,.8,.2,1)',
      style({ opacity: 1, transform: 'translateY(0)' })
    )
  ])
]);

/**
 * Simple fade in
 */
export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('360ms ease-out', style({ opacity: 1 }))
  ])
]);

/**
 * Zoom in slightly when entering (useful for cards)
 */
export const zoomInOnEnter = trigger('zoomInOnEnter', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate(
      '400ms ease-out',
      style({ opacity: 1, transform: 'scale(1)' })
    )
  ])
]);

/**
 * Zoom in/out on pointer hover or focus
 * Example: <div [@zoomOnHover]="hoverState" (mouseenter)="hoverState='hover'" (mouseleave)="hoverState='normal'">
 */
export const zoomOnHover = trigger('zoomOnHover', [
  state(
    'normal',
    style({
      transform: 'scale(1)',
      boxShadow: '0 8px 24px rgba(15,23,42,0.06)'
    })
  ),
  state(
    'hover',
    style({
      transform: 'scale(1.03)',
      boxShadow: '0 12px 32px rgba(15,23,42,0.12)'
    })
  ),
  transition('normal => hover', [animate('180ms ease-out')]),
  transition('hover => normal', [animate('180ms ease-in')])
]);
