import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {AuthenticationService} from '../service/authentication.service';

export interface Lang{
  name : string,
  code: string
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./../login-page/login-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  // if one of the inputs is empty isFormInvalid will be true
  isFormInvalid = false;

  // if there is no user in the database with the given username and password
  areCredentialsInvalid = false;

  siteKey: string = "6LdGiBwcAAAAADV-ewm3AvV1MfGYH8xt3ifPx0TD";

  numberOfBadPassword: number = 0;

  displayModal: boolean = false;
  displayModalAfterFourBadPassword: boolean = false;

  translatedLanguages : Lang[];
  selectedLang: Lang;

  constructor(private formBuilder: FormBuilder,
              private formBuilderCaptcha: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              public translate: TranslateService,
  ) {
    this.translatedLanguages = [
      {name: 'English', code: 'en'},
      {name: 'Română', code:'ro'}
    ];
    this.selectedLang = { name: '', code: ''};
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Changes the language of the application.
   * @param lang - Language object containing the name and the code for the preferred language
   */
  switchLang(lang: string) {
    localStorage.setItem('appLanguage',lang)
    this.translate.use(lang);
  }

  /**
   * Initializing register parameters.
   */
  ngOnInit() {
    localStorage.setItem('appLanguage','en');
    this.translate.use(localStorage.getItem('appLanguage') || '');
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.numberOfBadPassword);

    if (this.registerForm.invalid) {
      this.isFormInvalid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.loading = true;

    try {
      this.authenticationService.register(this.formControls['email'].value, this.formControls['username'].value, this.formControls['password'].value)
          .pipe(first())
          .subscribe(
              (data: Object) => {
                if (data !== "User not found!") {
                  this.router.navigate(['/home']);
                }
                // else if (data === "User not found") {
                //   this.isCaptchaUnchecked = false;
                //   this.isFormInvalid = false;
                //   this.areCredentialsInvalid = true;
                // }
                // else if (data ==="Bad password!") {
                //   this.numberOfBadPassword = this.numberOfBadPassword + 1;
                //   this.isCaptchaUnchecked = false;
                //   this.isFormInvalid = false;
                //   this.areCredentialsInvalid = true;
                // }
              },
              (error: HttpErrorResponse) => {
                console.log(error);
                if (error.status === 404) {
                  this.isFormInvalid = false;
                  this.areCredentialsInvalid = true;

                }
                if (error.status === 409) {
                  this.numberOfBadPassword = this.numberOfBadPassword + 1;
                  this.isFormInvalid = false;
                  this.areCredentialsInvalid = true;
                }

                if (this.numberOfBadPassword === 4) {
                  this.displayModalAfterFourBadPassword = true;
                }

                if (this.numberOfBadPassword === 5) {
                  // deactivate the user
                  this.userService.deactivateUser(this.formControls['username'].value).subscribe();
                  this.displayModal = true;
                }
                this.loading = false;
              });
    } catch(error) {}
  }
}
