export interface ScheduleEvent {
  id: number;
  name: string;
  start: Date;
  end: Date;
  duration?: Duration;
  lineId: number;
}
