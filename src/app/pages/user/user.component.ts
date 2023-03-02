import { HttpStatusCode } from '@angular/common/http';
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
  showErrorMessage: boolean = false;
  loading: boolean = true;

  constructor(private service: UserService, private router: Router) { 
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { showMessage: boolean};
  
    console.log(this.users)

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
        users => {
          if(users) {
            this.users = users
          } 
          this.loading = false;
        },
        err => {
          this.showErrorMessage = true
          this.loading = false;
        }
      );
  }
}
