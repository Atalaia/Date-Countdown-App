import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup;
  userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.form.valid) {
      
      const event = this.form.value as Event;

      this.eventService.saveEvent(event)
        .subscribe(
          (data: Event) => {
            this.router.navigate(['/my-events']);
          },
          (err: Error) => console.log(err),
          () => console.log('Request has completed')
        );
      console.log(this.form.value);
    }
  }

}
