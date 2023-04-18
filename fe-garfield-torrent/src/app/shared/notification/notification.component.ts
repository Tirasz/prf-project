import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { NotificationService } from '../services/Notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        top: 20
      })),
      state('closed', style({
        opacity: 0,
        top: -20
      })),
      transition('open => closed', [
        animate('0.25s')
      ]),
      transition('closed => open', [
        animate('0.25s')
      ]),
    ]),
  ]
})
export class NotificationComponent {
  @Input() type: string = ''
  @Input() title: string = ''
  @Input() subTitle: string = ''
  @Input() show: boolean = false;

  constructor(private notificationService: NotificationService) {
  }

  mouseEnter() {
    this.notificationService.clearMessage(this.type, this.title, this.subTitle);
  }

}
