import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../shared/services/shared.service';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { MessageService } from '../shared/services/message.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [CommonModule, NavbarComponent, ReactiveFormsModule]
})
export class HomeComponent {
    loginForm!: FormGroup;
    registrationForm!: FormGroup;
    showLogin = 'signIn'

    constructor(private router: Router,
        private sharedService: SharedService,
        private authService: AuthService,
        private messageService: MessageService,
        private fb: FormBuilder) {

        this.sharedService.getAuthAction().subscribe(res => this.showLogin = res)
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
        this.registrationForm = this.fb.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            phone_number: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
    }

    login() {
        this.sharedService.postRequest('/api/v1/auth/login', this.loginForm.value)
            .pipe(
                take(1),
                tap((res: any) => {
                    this.authService.decodeJwt(res?.token);
                    this.router.navigate(['/dashboard'])
                    this.messageService.showSuccess('Logged in successfully')
                })
            ).subscribe()
    }

    register() {
        this.sharedService.postRequest('/api/v1/auth/register', this.registrationForm.value)
            .pipe(
                take(1),
                tap((res: any) => {
                    this.authService.decodeJwt(res?.token);
                    this.router.navigate(['/dashboard'])
                    this.messageService.showSuccess('Logged in successfully')
                })
            ).subscribe()
    }

}
