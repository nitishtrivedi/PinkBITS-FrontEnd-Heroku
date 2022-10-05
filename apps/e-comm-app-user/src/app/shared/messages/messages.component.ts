import { Component, OnInit } from '@angular/core';
import { CartService } from '@pinkbits/orders-shared-lib';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'pinkbits-messages',
  templateUrl: './messages.component.html',
  styles: []
})
export class MessagesComponent implements OnInit {
  constructor(private cartService: CartService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.messageService.add({
        severity: 'info',
        summary: 'Yay!',
        detail: 'Cart has been updated'
      });
    });
  }
}
