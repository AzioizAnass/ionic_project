import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { doc, getDoc,setDoc,updateDoc,arrayRemove,arrayUnion   } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

import {db} from "../../environments/environment";
@Component({
  selector: 'app-cours-description',
  templateUrl: './cours-description.page.html',
  styleUrls: ['./cours-description.page.scss'],
})
export class CoursDescriptionPage implements OnInit {
   
  cours : any
  id: string   
  titre:string
  prerequis : string
  prix : string
  description : string
  email: any
  image:any
  dateDeb:string
  dateFin:string


  constructor(private route : ActivatedRoute ,private router : Router) { }
 
  deconnecter(): void {
    const auth = getAuth();
signOut(auth).then(() => {
// Sign-out successful.
}).catch((error) => {
// An error happened.
});
this.router.navigate(['/home'])
  }

  async retrieveData()  {
    this.cours = this.route.snapshot.params
     
    //console.log(this.email.email)
    const docRef = doc(db, "Formations",this.cours.cours);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data().firstName);
      this.id=docSnap.data().id
      this.titre=docSnap.data().titre
      this.prerequis=docSnap.data().prerequis
      this.prix=docSnap.data().prix
      this.description=docSnap.data().description
      this.image=docSnap.data().image
      this.dateDeb=docSnap.data().date_de_debut
      this.dateFin=docSnap.data().date_de_fin
      
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
      }

      /*async addCourseFb (course : string)  {
        await updateDoc(doc(db, "Users",this.email.email ), {
          myCourses: arrayUnion(course),
          courses: arrayRemove(course)
    
         
       }*/
  ngOnInit() {
    this.retrieveData()
    console.log(this.email)
  }

}
