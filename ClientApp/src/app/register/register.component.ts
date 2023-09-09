import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../api/services';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  requestedUrl?: string = undefined
  emailExists = false;

  form = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    password: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(35)])],
    address: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(200)])],
  })

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => this.requestedUrl = p['requestedUrl'])
  }


  register() {
    if (this.form.invalid)
      return;

    console.log("Form Values:", this.form.value);

    this.userService.registerUser({ body: this.form.value })
      .subscribe(
        (_) => {
          if (!this.emailExists) {
            console.log("Added");
            this.login();
          }
        },
        (e) => {
          if (e.status == 500) {
            this.emailExists = true;
          } else {
            console.log(e.error);
          }
        }
      );
  }

  checkPassenger(): void {
    const params = { email: this.form.get('email')?.value! }

    this.userService
      .findUser(params)
      .subscribe(
        _ => this.emailExists = true, e => {
          if (e.status == 404)
            this.emailExists = false
        }
      )
  }


  private login = () => {
    this.authService.loginUser({
      address: this.form.get('address')?.value!,
      email: this.form.get('email')?.value!,
      password: this.form.get('password')?.value!
    })
    this.router.navigate([this.requestedUrl ?? '/menu'])
  }

}
