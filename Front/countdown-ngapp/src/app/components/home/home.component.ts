import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { Event } from 'src/app/models/event.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoadingResults = false;
  userId: string = '';
  events: Event[];

  // Angular material datepicker
  startDateTime: number = new Date().getTime();
  endDateTime: number;
  @Output()
  dateChange: EventEmitter<MatDatepickerInputEvent<any>>;
  @Output()
  dateInput: EventEmitter<MatDatepickerInputEvent<any>>;

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.user) {
      this.userId = this.authService.user._id;
    }

    this.eventService.getUserEvents()
      .subscribe((data => {
        this.events = data;
        this.isLoadingResults = true;
      })
      );
  }

  deleteItem(eventId) {
    if (confirm("Are you sure you want to delete this event?")) {
      this.eventService.deleteEvent(eventId)
        .subscribe(
          (data => {
            console.log(data);
            location.reload();
          })
        );
    }
  }

  // Angular material datepicker
  addEvent(date: any) {
    console.log(date.value);
    console.log(typeof date.value);

    this.endDateTime = date.value.getTime();
  }

  resetCountdown() {
    this.endDateTime = null;
  }

}
