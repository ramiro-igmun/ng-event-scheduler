export interface ScheduleEvent {
  id: number;
  name: string;
  start: Date;
  end: Date;
  lineId: number;
}

export interface ExtendedScheduleEvent extends ScheduleEvent{
  duration?: Duration;
  color?: string;
}
