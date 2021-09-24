import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiAuthService } from "../services/apiauth.service";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Login } from "../models/login";

@Component({templateUrl:'login.component.html'})

export class LoginComponent implements OnInit {
    public loginForm = this.formBuilder.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['', Validators.required]
    });

    constructor(public _apiAuthService:ApiAuthService,
        private router:Router,
        private formBuilder:FormBuilder){
        /*if (this._apiAuthService.usuarioData) {
            this.router.navigate(['/']);
        }*/
    }

    ngOnInit() {

    }

    login() {
        this._apiAuthService.login(this.loginForm.value).subscribe(response => {
            if (response.exito == 1)
            {
                this.router.navigate(['/']);
            }
        })
    }
}