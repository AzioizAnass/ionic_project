import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc,setDoc,updateDoc,arrayUnion,arrayRemove  } from "firebase/firestore";
import {db} from "../../environments/environment";
import { getAuth, signOut } from "firebase/auth";
import {auth} from "../../environments/environment";


@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage  implements OnInit {

name:string
email : any
myCourses : string[]
courses : string[]
ionic:{id:"",titre:"",prerequis:"",prix:"",description:""}
angular :{id:"",titre:"",prerequis:"",prix:"",description:""}
laravel :{id:"",titre:"",prerequis:"",prix:"",description:""}
reactJs :{id:"",titre:"",prerequis:"",prix:"",description:""}
spring:{id:"",titre:"",prerequis:"",prix:"",description:""}
  constructor(private route : ActivatedRoute ,private router : Router) { }
  
  

  async addCourseFb (course : string)  {
    await updateDoc(doc(db, "Users",this.email.email ), {
      myCourses: arrayUnion(course),
      courses: arrayRemove(course)

     
   }

   )
   console.log(this.myCourses);
 }


 async retrieveCourseData(course : string)  {
  
   
  //console.log(this.email.email)
  const docRef = doc(db, "Formations",course);
  const docSnap = await getDoc(docRef);
  /*if (docSnap.exists()) {
    //console.log("Document data:", docSnap.data().firstName);
    =docSnap.data().id
    course.titre=docSnap.data().titre
    course.prerequis=docSnap.data().prerequis
    course.prix=docSnap.data().prix
    course.description=docSnap.data().description
    
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }*/
    }

    deconnecter(): void {
      const auth = getAuth();
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
this.router.navigate(['/home'])
    }
 
  consulter(cours: string):void{
    this.router.navigate(['/cours-description',cours])
  }


  ajouterCours(cours : string){
    this.myCourses=[...this.myCourses,cours]
    
    this.addCourseFb(cours) 
    this.retrieveData() 
    
  }


  async retrieveData()  {
    this.email = this.route.snapshot.params
    //console.log(this.email.email)
    const docRef = doc(db, "Users",this.email.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data().firstName);
      this.name=docSnap.data().firstName
      this.courses=docSnap.data().courses
      this.myCourses=docSnap.data().myCourses
      //this.courses=docSnap.data().
      console.log(this.courses)
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
      }
  
  
      ngOnInit() {
    //onAuthStateChanged(auth,(currentUser)=>setUser(currentUser));
    this.retrieveData();
  }

}
