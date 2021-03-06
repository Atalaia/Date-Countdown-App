import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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
  isLoadingResults: boolean = false;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
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
          this.isLoadingResults = true;
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

