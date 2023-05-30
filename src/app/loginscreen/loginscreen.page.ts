import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-loginscreen',
  templateUrl: './loginscreen.page.html',
  styleUrls: ['./loginscreen.page.scss'],
})

export class LoginscreenPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router,
    private loadingController: LoadingController,
    private toastController: ToastController
    ) 
    {      }

  ngOnInit() {
  }

}



