import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  form: FormGroup;
  event: Event;
  userId: string = '';
  isLoadingResults: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    console.log(typeof this.route.snapshot.params['id']);
  
    this.eventService.getEventDetail(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.event = data;
        this.isLoadingResults = true;
        this.setFormValues();
      });

    if (this.authService.user) {
      this.userId = this.authService.user._id;
      console.log(this.userId);
    }

    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      eventEndDate: ['', Validators.pattern('^([0-9]{4})(-[0-9]{2}){2}$')],
      user: [this.userId],
    });

  }
  
  setFormValues() {
    this.form.get('title').setValue(this.event.title);
    this.form.get('description').setValue(this.event.description);
    this.form.get('eventEndDate').setValue(this.event.eventEndDate);
  }

  onSubmit(): void {
    if (this.form.valid) {
      
      const event = this.form.value as Event;

      this.eventService.editEvent(this.event._id, event)
        .subscribe(
          (data: Event) => {
            this.router.navigate(['/event-details/', this.event._id]);
          },
          (err: Error) => console.log(err),
          () => console.log('Request has completed')
        );
      console.log(this.form.value);
    }
  }

}
