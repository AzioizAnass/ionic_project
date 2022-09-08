import { Component ,OnInit } from '@angular/core';
import { UserSignin } from '../Models/user.interface';
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth'
import { auth } from './../../environments/environment';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from './../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit{
  user : string
  email: string
  password: string
  data : any;
  
  constructor(private route : ActivatedRoute, private router : Router) {}
  ngOnInit() {
  }
  go (){
    this.router.navigate(['user-home'])
  }
  loginUser() :void {
    signInWithEmailAndPassword(auth,this.email,this.password)
    .then((usr)=>{
      getDoc(doc(db, "Users", usr.user.uid))
      .then((doc) => {
        const userData = doc.data()     
        this.router.navigate(['/user-home',this.email]);
      })
    }).catch(()=>{alert('Email ou le mot de passe est incorrect');});
  }
  toInscriptionPage():void {
    this.router.navigate(['/inscription']);
  }
}
