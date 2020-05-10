import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { AuthService } from 'src/app/services/auth.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoadingResults = false;
  userId: string = '';
  events: Event[];

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) {}
  
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
}
