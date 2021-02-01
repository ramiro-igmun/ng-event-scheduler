import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {
  addDays,
  eachDayOfInterval,
  endOfYear,
  getDayOfYear,
  intervalToDuration,
  isToday,
  isWithinInterval,
  startOfYear
} from 'date-fns';
import {ExtendedScheduleEvent, ScheduleEvent} from '../models/ScheduledEvent';
import {Line} from '../models/Line';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit, AfterViewInit {

  @Input() events: ScheduleEvent[] = [];
  @Input() lines: Line[] = [];
  @Output() eventDrop = new EventEmitter<ScheduleEvent>();

  @ViewChild('today') today: ElementRef<HTMLDivElement> | undefined;

  daysOfYear: Date[] = [];
  DayOfYearDataMap = new Map<string, ExtendedScheduleEvent[]>();
  daysWithEvents: Date[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.daysOfYear = this.getYearDatesArray();
    this.DayOfYearDataMap = this.getDayOfYearDataMap(this.lines, this.daysOfYear, this.events);
    this.daysWithEvents = this.getDaysWithEvents(this.events);
  }

  ngAfterViewInit(): void {
    console.log(this.today);
  }

  onEventDropped($event: CdkDragDrop<any>, date: Date, line: Line): void {
    const event = $event.item.data;
    if (!this.isEventOverlapping(date, line.id, event)) {
      event.start = date;
      event.end = addDays(date, event.duration.days);
      event.lineId = line.id;
      transferArrayItem($event.previousContainer.data, $event.container.data, 0, 0);
      this.DayOfYearDataMap = new Map<string, ExtendedScheduleEvent[]>(this.DayOfYearDataMap);
      this.eventDrop.emit(event);
    }
  }

  private getDayOfYearDataMap(lines: Line[], days: Date[], events: ScheduleEvent[]): Map<string, ExtendedScheduleEvent[]> {
    const scheduledEvents = new Map<string, ExtendedScheduleEvent[]>();
    lines.forEach(line => {
      days.forEach(day => scheduledEvents.set(`${line.id}${getDayOfYear(day)}`, []));
    });
    (events as ExtendedScheduleEvent[]).forEach(event => {
      event.duration = intervalToDuration({start: event.start, end: event.end});
      event.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
      scheduledEvents.set(`${event.lineId}${getDayOfYear(event.start)}`, [event]);
    });
    return scheduledEvents;
  }

  private getYearDatesArray(): Date[] {
    return eachDayOfInterval({start: startOfYear(new Date()), end: endOfYear(new Date())});
  }

  getDateEventData(line: Line, date: Date): ExtendedScheduleEvent | null {
    const eventData = this.DayOfYearDataMap.get(`${line.id}${getDayOfYear(date)}`);
    return eventData && eventData.length ? eventData[0] : null;
  }

  getDateEventDataAsArray(line: Line, date: Date): ExtendedScheduleEvent[] | [] {
    return this.DayOfYearDataMap.get(`${line.id}${getDayOfYear(date)}`) || [];
  }

  isToday(date: Date): boolean {
    return isToday(date);
  }

  private getDaysWithEvents(events: ExtendedScheduleEvent[]): Date[] {
    return events.reduce((acc, val) =>
      acc.concat(eachDayOfInterval({start: val.start, end: val.end})), [] as Date[]);
  }

  // TODO fix this method
  private isEventOverlapping(date: Date, lineId: number, event: ExtendedScheduleEvent): boolean {
    const isDateOverlapping = this.events.reduce((acc, val) => {
      return (acc || isWithinInterval(date, {
        start: val.start,
        end: val.end
      })) && val.lineId === lineId;
    }, false);
    return isDateOverlapping;
  }
}
