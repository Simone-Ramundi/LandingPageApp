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

  constructor(private notificationsService: NotificationsService) { 
    this.messages = this.notificationsService.messagesOutput;
  }

  ngOnInit() {
  }

  clearMessage(id: number){
    this.notificationsService.clearMessage(id);
  }

}
