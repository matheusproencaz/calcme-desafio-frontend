import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/UserService/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  showSuccessMessage: boolean = false;
  
  constructor(private service: UserService, private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { showMessage: boolean};
    if(state) {
      this.showSuccessMessage = state.showMessage;

      if(this.showSuccessMessage) {
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
      }
    }
  }

  ngOnInit(): void {
    this.service.getUsers()
      .subscribe(
        users => this.users = users
      );
  }
}
