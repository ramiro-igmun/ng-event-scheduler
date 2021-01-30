import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {ArrayService} from '../services/array.service';
import {addHours, eachDayOfInterval, endOfYear, getDayOfYear, intervalToDuration, startOfYear} from 'date-fns';

interface ScheduleEvent {
  name: string;
  start: Date;
  end: Date;
  duration?: Duration;
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  daysOfYear: Date[] = [];
  eventsData = new Map<number, ScheduleEvent[]>();

  getDayOfYear = getDayOfYear;

  events: ScheduleEvent[] = [
    {
      name: 'uno',
      start: new Date('01/05/21'),
      end: new Date('01/07/21')
    },
    {
      name: 'dos',
      start: new Date('01/09/21'),
      end: new Date('01/13/21')
    }
  ];

  constructor(private arrayService: ArrayService) {
  }

  ngOnInit(): void {
    this.daysOfYear = this.getYearDatesArray();
    this.eventsData = this.getScheduledEventData(this.daysOfYear, this.events);
  }

  onEventDropped($event: CdkDragDrop<any>, date: Date): void {
    console.log($event);
    console.log(date);
    console.log(this.events);
    const event = $event.item.data;
    event.start = date;
    event.end = addHours(event.end, event.duration.hours);
    console.log(event);
    console.log(this.events);
    transferArrayItem($event.previousContainer.data, $event.container.data, 0, 0);
  }

  private getYearDatesArray(): Date[] {
    return eachDayOfInterval({start: startOfYear(new Date()), end: endOfYear(new Date())});
  }

  private getScheduledEventData(days: Date[], events: ScheduleEvent[]): Map<number, ScheduleEvent[]> {
    const scheduledEvents = new Map<number, ScheduleEvent[]>();
    days.forEach(day => scheduledEvents.set(getDayOfYear(day), []));
    events.forEach(event => {
      event.duration = intervalToDuration({start: event.start, end: event.end});
      scheduledEvents.set(getDayOfYear(event.start), [event]);
    });
    return scheduledEvents;
  }
}
