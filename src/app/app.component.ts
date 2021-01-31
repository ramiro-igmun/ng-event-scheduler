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
      start: new Date('01/05/21'),
      end: new Date('01/07/21'),
      lineId: 1,
    },
    {
      id: 2,
      name: 'dos',
      start: new Date('01/09/21'),
      end: new Date('01/13/21'),
      lineId : 2
    }
  ];
  lines: Line[] = [
    {
      id: 1,
      name: 'Línea 1'
    },
    {
      id: 1,
      name: 'Línea 2'
    }
  ];

  updateEvent($event: ScheduleEvent): void {
    console.log($event);
  }
}
