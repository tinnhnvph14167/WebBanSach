import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss']
})
export class SiginComponent {
  isMatch: boolean = false;
  user: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.user = JSON.parse(localStorage.getItem("user") as string) || null;
  }

  formSigninValue = this.formBuilder.group({
    email: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  onHandleSubmit = async () => {
    this.isMatch = true;

    if (this.formSigninValue.valid) {
      this.auth.login(this.formSigninValue.value).subscribe((data: any) => {
        console.log("data?.message", data);
        this.toastr.info(data?.message);
        console.log("data.auth.name", data.auth.name);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('name', data.auth.name);
        localStorage.setItem('email', data.auth.email);
        console.log("data.message", data.message);

        if (data.data) {
          this.isMatch = false;
          localStorage.setItem("user", JSON.stringify(data));
        }

        // Chuyển hướng đến màn hình home sau khi đăng nhập thành công
        this.router.navigate(['/']);
      });
    }
  };
}
