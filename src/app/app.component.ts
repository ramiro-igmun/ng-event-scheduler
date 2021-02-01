import { Component } from '@angular/core';
import {ScheduleEvent} from './models/ScheduledEvent';
import {Line} from './models/Line';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'scheduler';
  events: ScheduleEvent[] = [
    {
      id: 1,
      name: 'uno',
      start: new Date('01/05/21 00:05'),
      end: new Date('01/07/21 23:55'),
      lineId: 1,
    },
    {
      id: 2,
      name: 'dos',
      start: new Date('01/09/21 00:05'),
      end: new Date('01/13/21 23:55'),
      lineId : 2
    },
    {
      id: 3,
      name: 'tres',
      start: new Date('01/01/21 00:05'),
      end: new Date('01/5/21 23:55'),
      lineId : 2
    }
  ];
  lines: Line[] = [
    {
      id: 1,
      name: 'Línea 1'
    },
    {
      id: 2,
      name: 'Línea 2'
    },
    {
      id: 3,
      name: 'Línea 3'
    }
  ];

  updateEvent($event: ScheduleEvent): void {
    console.log($event);
  }
}
