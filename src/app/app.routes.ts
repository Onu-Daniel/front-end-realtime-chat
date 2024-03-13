import { Routes } from '@angular/router';
import { JoinGroupComponent } from './join-group/join-group.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    // Redirect empty path to 'join-group' path
    { path: '', redirectTo: 'join-group', pathMatch: 'full' },
    
    // Route to the 'JoinGroupComponent' when the path is 'join-group'
    { path: 'join-group', component: JoinGroupComponent },
    
    // Route to the 'ChatComponent' when the path is 'chat'
    { path: 'chat', component: ChatComponent }
];
