import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CountdownService } from 'src/app/services/countdown.service';
import { Subscription, interval } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  // COMPONENT PROPERTIES
  startDateTime: number = new Date().getTime();
  endDateTime: number;

  countdownInterval: Subscription;
  
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  percent: number;
  
  @Output()
  dateChange: EventEmitter<MatDatepickerInputEvent<any>>;
  @Output()
  dateInput: EventEmitter<MatDatepickerInputEvent<any>>;

  ngOnInit() {
    console.log("ngOnInit");
    this.countdownInterval = interval(1000).subscribe(value => this.updateCountdown());
  }

  @Input()
  set endDate(date: string) {
    this.endDateTime = new Date(date).getTime();
  }

  @Input()
  set startDate(date: string) {
    this.startDateTime = new Date(date).getTime();
  }

  addEvent(date: any) {
    console.log(date.value);
    console.log(typeof date.value);

    this.endDateTime = date.value.getTime();
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distanceBetweenEndDateAndNow = this.endDateTime - now;

    if (distanceBetweenEndDateAndNow >= 0) {
      this.days = Math.floor(distanceBetweenEndDateAndNow / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distanceBetweenEndDateAndNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distanceBetweenEndDateAndNow % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distanceBetweenEndDateAndNow % (1000 * 60)) / 1000);
      this.percent = Math.floor((now - this.startDateTime) * 100 / (this.endDateTime - this.startDateTime));
    } else {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.percent = 100;
    }
  }

  

} // COMPONENT ENDS
