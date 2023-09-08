import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../api/services';
import { AuthService } from '../auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRm } from '../api/models';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  requestedUrl?: string = undefined
  public noSuchEmail = false;
  public incorrectPassword = false;
  public currentUser?: UserRm;

  form = this.fb.group({
    email: [''],
    password: [''],
  })

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => this.requestedUrl = p['requestedUrl'])
  }


  signin() {

    if (this.form.invalid)
      return;

    let givenPassword = this.form.value.password;
    console.log("Form Values:", this.form.value);

    this.userService.findUser({
      email: this.form.value.email!
    })
      .subscribe(r => {
        if (givenPassword == r.password) {
          this.currentUser = r;
          this.login(this.currentUser);
        }
        else {
          this.incorrectPassword = true;
        }
      }, console.error)
  }

  checkPassenger(): void {
    const params = { email: this.form.get('email')?.value! }

    this.userService
      .findUser(params)
      .subscribe(
        _ => {}, e => {
          if (e.status == 404) {
            this.noSuchEmail = true;
          }
        }
      )
  }




  private login = (user: UserRm) => {
    this.authService.loginUser({
      address: user?.address!,
      email: user?.email!,
      password: user?.password!
    })
    console.log(user?.address);
    this.router.navigate(['/menu'])
  }

}
