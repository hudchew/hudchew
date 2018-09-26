import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Router } from '@angular/router';
import { FirebaseServiceService } from '../service/firebase-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  wikiList: AngularFireList<any>;
  wikis: any[];

  constructor(
    db: AngularFireDatabase,
    private router: Router,
    private firebaseService: FirebaseServiceService
    ) {
    this.wikiList = db.list('wikis');
  }

  ngOnInit() {
    this.firebaseService.getWikiList().subscribe(items => {
      this.wikis = items;
    });
  }

  editWiki(data) {
    this.router.navigate([`/editWiki/${data.key}`]);
  }

  delWiki(data) {
    this.firebaseService.removeWiki(data.key);
  }

}
