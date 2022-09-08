import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { collection, addDoc, setDoc, doc ,getDoc} from "firebase/firestore";

import { db } from 'src/environments/environment';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../environments/environment';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  firstName: string
  lastName: string
  email : string
  data : any
  password : string
  confirmPassword : string
  CoursesList : {}
  constructor(private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {
  }
  
  async retrieveCoursesListe()  {
    
    //console.log(this.email.email)
    const docRef = doc(db, "Formations");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      //this.name=docSnap.data().firstName
      this.CoursesList= docSnap.data() ;


    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
      }

  async addUser ()  {
     await setDoc(doc(db, "Users",this.email), {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      myCourses :[],
      courses:["angular","ionic","laravel","reactJs","spring"]
    })
    
  }
dejaInscris(): void{
  this.router.navigate(['home'])
}

  signUp() : void {
    if (this.password === this.confirmPassword) {
      createUserWithEmailAndPassword(auth, this.email, this.password);
      //this.retrieveCoursesListe();
      console.log(this.CoursesList);
      this.addUser() ;
      this.router.navigate(['/user-home',this.email])
        }
      
      else{console.log("Echec de crée le document !!");}}}
  
