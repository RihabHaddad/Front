import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

enum ErrorStates {
  NotSubmitted,
  HasError,
  NoError,
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errorState: ErrorStates = ErrorStates.NotSubmitted;
  errorStates = ErrorStates;
  isLoading$: Observable<boolean>;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      resetToken: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  resetPassword() {
    const resetToken = this.resetPasswordForm.value.resetToken;
    const newPassword = this.resetPasswordForm.value.newPassword;

    console.log('Reset Token:', resetToken);
    console.log('New Password:', newPassword);

    this.authService.resetPassword(resetToken, newPassword)
      .subscribe(
        () => {
          console.log('Password reset successfully');
        },
        error => {
          console.error('Error resetting password:', error);
        }
      );
  }
}
