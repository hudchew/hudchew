import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseServiceService } from '../service/firebase-service.service';

@Component({
  selector: 'app-add-wiki',
  templateUrl: './add-wiki.component.html',
  styleUrls: ['./add-wiki.component.css']
})
export class AddWikiComponent implements OnInit {

  wiki: any= {};
  title: string = "Add Wiki";
  id;

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute, 
    private router: Router,
    private firebaseService: FirebaseServiceService
  ){}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id){
        this.getWikiByKey(this.id);
        this.title = "Edit wiki";
    }
  }

  addWiki(data: NgForm){
    if(this.id){
      this.firebaseService.editWiki(this.id,data.value).then(this.goToHome);
    }else{
      this.firebaseService.addWiki(data.value).then(this.goToHome);
    }
  }

  getWikiByKey(id){
    this.firebaseService.getWiki(id).subscribe(res =>{
      this.wiki = res.payload.val();
    });
  }

  goToHome=()=>{
    this.router.navigate(['/']);
  }


}
