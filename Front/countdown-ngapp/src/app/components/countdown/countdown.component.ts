import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  // COMPONENT PROPERTIES
  startDateTime: number;
  endDateTime: number;

  countdownInterval: Subscription;
  
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  percent: number;
  

  ngOnInit() {
    this.countdownInterval = interval(1000).subscribe(value => this.updateCountdown());
  }

  @Input()
  set startDate(date: string) {
    this.startDateTime = new Date(date).getTime();
  }

  @Input()
  set endDate(date: string) {
    this.endDateTime = new Date(date).getTime();
  }

  updateCountdown() {
    const now = new Date().getTime();
    const distanceBetweenEndDateAndNow = this.endDateTime - now;

    if (distanceBetweenEndDateAndNow >= 0) {
      this.days = Math.floor(distanceBetweenEndDateAndNow / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distanceBetweenEndDateAndNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distanceBetweenEndDateAndNow % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distanceBetweenEndDateAndNow % (1000 * 60)) / 1000);
      this.percent = Math.floor((now - this.startDateTime) / (this.endDateTime - this.startDateTime) * 100);
    } else {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.percent = 100;
    }
  }
  
} // COMPONENT ENDS
