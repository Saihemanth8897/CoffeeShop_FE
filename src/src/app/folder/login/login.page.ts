import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage
  implements OnInit, AfterContentChecked, OnChanges, AfterViewInit
{
  ionicForm: FormGroup = this.formBuilder.group({});
  isSubmitted = false;
  isLoading = false;
  windowSize = 600;
  @Output() OpenMenu = new EventEmitter();
  submitButtonDetals = {
    submitBtnInfo: {
      buttonName: 'Log in',
      buttonColor: 'success btn-success-dark',
    },
    extraLinks: [
      {
        linkText: "don't have account ?",
        redirectUrl: '/signup',
      },
    ],
  };
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private menuService: MenuService
  ) {}
  formData: any;
  ngOnChanges() {
    this.cdr.detach();
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }
  ngAfterViewInit() {
    this.cdr.detach();
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }
  ngOnInit() {
    sessionStorage.removeItem('cardData');
    let checkJWT = sessionStorage.getItem('access_token');
    let haveRefreshToken = localStorage.getItem('refresh_token');
    let refreshed = false;
    if (checkJWT || haveRefreshToken) {
      // this.authenticationService.refreshToken().subscribe({
      //   next: (res) => {
      //     setTimeout(() => {
      //       this.ngxService.stop();
      //       this.goToDashBoard();
      //     }, 5000);
      //     this.isLoading = false;
      //     refreshed = true;
      //   },
      //   error: (error) => {
      //     sentryError(error);
      //     this.ngxService.stop();
      //     this.isLoading = false;
      //     refreshed = false;
      //   },
      // });
    }
    // if (!refreshed) {
    //   this.formData = [
    //     {
    //       label: 'Email',
    //       type: 'email',
    //       alias: 'email',
    //       validators: [
    //         {
    //           key: 'required',
    //           value: true,
    //           customMessage: '',
    //         },
    //         {
    //           key: 'email',
    //           value: true,
    //           customMessage: `Please Enter the valid Email.`,
    //         },
    //       ],
    //       value: '',
    //     },

    //     {
    //       label: 'Password',
    //       type: 'password',
    //       alias: 'password',
    //       validators: [
    //         {
    //           key: 'required',
    //           value: true,
    //           customMessage: '',
    //         },
    //         {
    //           key: 'minlength',
    //           value: 5,
    //           customMessage: 'Password should be minimum 5 charecter length',
    //         },
    //       ],
    //       value: '',
    //     },
    //   ];
    // }

    this.formData = [
      {
        label: 'User Name',
        type: 'text',
        alias: 'username',
        validators: [
          {
            key: 'required',
            value: true,
            customMessage: '',
          },
        ],
        value: '',
      },

      {
        label: 'Password',
        type: 'password',
        alias: 'password',
        validators: [
          {
            key: 'required',
            value: true,
            customMessage: '',
          },
          {
            key: 'minlength',
            value: 5,
            customMessage: 'Password should be minimum 5 charecter length',
          },
        ],
        value: '',
      },
    ];
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  goToDashBoard() {
    // return this.router.navigate(['todo-dashboard']);
  }

  ngAfterContentChecked() {
    this.windowSize = window.innerWidth;
  }

  isSubmittedForm(event: any) {
    if (event.valid) {
      const payload: any = {
        ...event.value,
      };
      // this.authenticationService.onLogin(payload).subscribe({
      //   next: (res: any) => {
      //     this.isSubmitted = !this.isSubmitted;
      //     console.log('api');
      //     this.goToDashBoard();
      //     this.ionicForm.reset();
      //   },
      //   error: (error: { message: string; status: any }) => {
      //     sentryError(error);
      //     console.log(error);
      //   },
      // });
      this.menuService.login(payload).subscribe((success: any) => {
        this.router.navigate(['/dashboard']);
        console.log('Yes success');
      });
    }

    //  const payload: SignUpWithPasswordCredentials = {
    //    ...this.ionicForm.value,
    //  };
    //  this.authenticationService.onLogin(payload).subscribe({
    //    next: (res: any) => {
    //
    //      this.isSubmitted = !this.isSubmitted;
    //      this.goToDashBoard();
    //    },
    //    error: (error: { message: string; status: any }) => {
    //      sentryError(error);
    //      console.log(error);
    //    },
    //  });
  }
}