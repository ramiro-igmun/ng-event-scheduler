import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {ArrayService} from '../services/array.service';
import {add, getDayOfYear} from 'date-fns';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {

  daysOfYear: Date[] = [];
  eventData = new Map<number, string[]>();
  eventDate = new Date('01/05/2021');

  getDayOfYear = getDayOfYear;

  constructor(private arrayService: ArrayService) {
  }

  ngOnInit(): void {
    this.daysOfYear = this.getYearDatesArray();
    this.eventData = this.getScheduledEventData(this.daysOfYear);
  }

  private getYearDatesArray(): Date[] {
    let tempDate = new Date(new Date().getFullYear(), 0);
    const tempDates: Date[] = [];
    while (tempDate.getFullYear() === new Date().getFullYear()) {
      tempDates.push(tempDate);
      tempDate = add(tempDate, {days: 1});
    }
    return tempDates;
  }

  onEventDropped($event: CdkDragDrop<any>): void {
    console.log($event.container.data);
    console.log($event.previousContainer.data);
    transferArrayItem($event.previousContainer.data, $event.container.data, 0, 0);
  }

  private getScheduledEventData(days: Date[]): Map<number, string[]> {
    const scheduledEvents = new Map<number, string[]>();
    days.forEach(day => scheduledEvents.set(getDayOfYear(day), []));
    scheduledEvents.set(5, ['event']);
    return scheduledEvents;
  }
}
