import { Component, OnInit, inject } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  // Inject the ChatService
  chatService = inject(ChatService);

  // Inject the Router
  router = inject(Router);

  // Array to store chat messages
  messages: any[] = [];

  // Variable to capture user input message
  inputMessage: string = '';  // Initialize with an empty string

  userDisplayName = sessionStorage.getItem("user");
groupName = sessionStorage.getItem("chatGroup");

  // OnInit lifecycle hook
  ngOnInit(): void {
    // Subscribe to messages from the chat service
    this.chatService.messages$.subscribe(res => {
      // Update the local messages array and log to console
      this.messages = res;
      console.log(this.messages);
    });

    // Subscribe to connected users updates from the chat service
    this.chatService.activeUsers$.subscribe(res => {
      // Log connected users to console
      console.log(res);
    });
  }

  SendChatMessage() {
    // Call the SendChatMessage method from the chat service with the inputMessage
    this.chatService.SendChatMessage(this.inputMessage)
      .then(() => {
        // If the message is sent successfully, reset the inputMessage variable
        this.inputMessage = '';
      })
      .catch((err) => {
        // Log any errors that occur during the SendChatMessage operation
        console.log(err);
      });
  }

  leaveChat() {
    // Call the leaveChat method from the chat service
    this.chatService.leaveChat()
      .then(() => {
        // If leaving the chat is successful, navigate to the 'join-group' route
        this.router.navigate(['join-group']);
  
        // Reload the location after a short delay to ensure a fresh start
        setTimeout(() => {
          location.reload();
        }, 0);
      })
      .catch((error) => {
        // Log any errors that occur during the leaveChat operation
        console.log(error);
      });
  }
}
