import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  isLoadingResults = false;
  event: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    console.log(typeof this.route.snapshot.params['id']);
  
    this.showEventDetails(this.route.snapshot.params['id']);
  }

  showEventDetails(eventId) {
    this.eventService.getEventDetail(eventId)
      .subscribe(data => {
        this.event = data;
        console.log(this.event);
        this.isLoadingResults = true;
      })
  }

}
