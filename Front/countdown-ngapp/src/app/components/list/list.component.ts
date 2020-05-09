import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  
  dataSource: any;
  displayedColumns: string[] = ['position', 'title', 'description', 'eventEndDate', 'actions'];

  userId: string;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.user) {
      this.userId = this.authService.user._id;
    }

    this.eventService.getUserEvents()
      .subscribe(
        (data => {
          this.dataSource = data;
          console.log(this.dataSource);
        })
      )
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

}

