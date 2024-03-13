import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-join-group',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './join-group.component.html',
  styleUrl: './join-group.component.css'
})
export class JoinGroupComponent {

  

   // Reactive form instance for joining a group
   joinGroupForm!: FormGroup;
   router = inject(Router)
chatService = inject(ChatService)

   // FormBuilder instance
   formBuilder = inject(FormBuilder);
 
   ngOnInit(): void {
     // Initialize the form and define its structure with validation rules
     this.joinGroupForm = this.formBuilder.group({
       user: ['', Validators.required],         // User input with required validation
       chatGroup: ['', Validators.required]      // Chat group input with required validation
     });
   }

   joinGroup() {
    // Extract user and chatGroup values from the form
    const { user, chatGroup } = this.joinGroupForm.value;

    // Store user and chatGroup values in sessionStorage for future use
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("chatGroup", chatGroup);

    // Call the joinGroup method from the chat service
    this.chatService.joinGroup(user, chatGroup)
      .then(() => {
        // If the joinGroup operation is successful, navigate to the 'chat' route
        this.router.navigate(['chat']);
      })
      .catch((error) => {
        // If there's an error during the joinGroup operation, log the error
        console.log(error);
      });
  }
}
