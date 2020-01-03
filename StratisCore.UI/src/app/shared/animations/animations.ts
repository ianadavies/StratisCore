import { animate, state, style, transition, trigger } from '@angular/animations';

export class Animations {
  public static fadeIn = [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
          height: 0
        }),
        animate(400)
      ]),
      transition(':leave',
        animate(400, style({opacity: 0, height: 0})))
    ])
  ];
  public static expand = [
    trigger('state', [
      state(
        'visible',
        style({
          opacity: '1'
        })
      ),
      state(
        'hidden',
        style({
          opacity: '0'
        })
      ),
      transition('* => visible', [animate('500ms ease-out')]),
      transition('visible => hidden', [animate('500ms ease-out')])
    ])
  ];

  public static collapseExpand = [
    trigger('collapseExpand', [
      state('collapsed', style({
        opacity: 0,
        height: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        opacity: 1,
        height: '*',
        overflow: 'hidden'
      })),
      transition('* => expanded', animate('500ms ease-out')),
      transition('expanded => collapsed', animate('500ms ease-in'))
    ])
  ]
}