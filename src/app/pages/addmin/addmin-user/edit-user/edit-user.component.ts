import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  submitValue: boolean = false;
  user!: any;

  userForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private routers: Router
  ) {
    this.route.paramMap.subscribe(params => {
      const _id = (params.get('id'))
      this.userService.getByIduser(_id).subscribe((response: any) => {
        this.user = response.data;
        console.log(response.data.name);

        this.userForm.patchValue({
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
        })

      })
    })
  }

  onHandleSubmit() {
    this.submitValue = true;
    if (this.userForm.valid) {
      const user: any = {
        _id: this.user._id,
        name: this.userForm.value.name || '',
        email: this.userForm.value.email || '',
        role: this.userForm.value.role || ''
      }

      this.userService.updateUser(user).subscribe(data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cập nhập Tài khoản thành công!',
          text: 'Tài khoản đã được cập nhập thành công!',
          showConfirmButton: false,
          iconHtml: '<i class="fas fa-check-circle"></i>',
          timer: 2000
        })
        this.routers.navigate(['admin/user']);
      }, (error) => {
        alert("Cập nhập không thành công")

      })
    }
  }

}
