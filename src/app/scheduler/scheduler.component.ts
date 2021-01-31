import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {addHours, eachDayOfInterval, endOfYear, getDayOfYear, intervalToDuration, startOfYear} from 'date-fns';
import {ScheduleEvent} from '../models/ScheduledEvent';
import {Line} from '../models/Line';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  @Input() events: ScheduleEvent[] = [];
  @Input() lines: Line[] = [];
  @Output() eventDrop = new EventEmitter<ScheduleEvent>();

  daysOfYear: Date[] = [];
  eventsData = new Map<number, ScheduleEvent[]>();

  constructor() {
  }

  ngOnInit(): void {
    this.daysOfYear = this.getYearDatesArray();
    this.eventsData = this.getScheduledEventData(this.daysOfYear, this.events);
  }

  onEventDropped($event: CdkDragDrop<any>, date: Date): void {
    const event = $event.item.data;
    event.start = date;
    event.end = addHours(event.end, event.duration.hours);
    transferArrayItem($event.previousContainer.data, $event.container.data, 0, 0);
    this.eventDrop.emit(event);
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

  getDateEventData(date: Date): ScheduleEvent | null {
    const eventData = this.eventsData.get(getDayOfYear(date));
    return eventData && eventData.length ? eventData[0] : null;
  }

  getDateEventDataAsArray(date: Date): ScheduleEvent[] | [] {
    return  this.eventsData.get(getDayOfYear(date)) || [];
  }
}
