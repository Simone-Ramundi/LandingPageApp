import { Component, OnInit } from '@angular/core';
import { NotificationsService, Command} from '../notifications.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css']
})
export class NotificationsListComponent implements OnInit {
  messages: Observable<Command[]>;

  constructor(notificationsService: NotificationsService) { 
    this.messages = notificationsService.messagesOutput;

    setInterval(()=>{
      notificationsService.addError('It does not work :(');
    }, 500)
  }

  ngOnInit() {
  }

}
