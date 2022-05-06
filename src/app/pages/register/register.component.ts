import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthday: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    repass: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private location: Location, private authService: AuthService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    // console.log(this.registerForm.value);
    if (
      this.registerForm.valid &&
      this.registerForm.get('pass')?.value ===
        this.registerForm.get('repass')?.value
    ) {
      this.authService.register(
        this.registerForm.get('email')?.value,
        this.registerForm.get('pass')?.value
      ).then(cred => {
        const user: User = {
          id: cred.user?.uid as string,
          email: this.registerForm.get('email')?.value,
          firstname: this.registerForm.get('firstname')?.value,
          lastname: this.registerForm.get('lastname')?.value,
          address: this.registerForm.get('address')?.value,
          birthday: this.registerForm.get('birthday')?.value
        };
        
        console.log(user);
        this.userService.create(user).then(() => {
          console.log('Successful user creation!');
          this.router.navigateByUrl('/plans');
        }).catch(error =>{
          console.error(error);
        });
      }).catch(error => {
        console.error(error);
      });
    }
  }

  goBack() {
    this.location.back();
  }
}
