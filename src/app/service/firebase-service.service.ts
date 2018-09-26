import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  wikiList: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.wikiList = db.list('wikis');
  }

  getWikiList(): Observable<any[]> {
    return this.wikiList.snapshotChanges().pipe(map(actions => {
      return actions.map(action => ({ 
        key: action.key, 
        value: action.payload.val() 
      }));
    }))
  }

  removeWiki(id): void {
    this.wikiList.remove(id);
  }

  addWiki(data) {
    return this.wikiList.push(data);
  }

  editWiki(id, data) {
    return this.wikiList.update(id, data);
  }

  getWiki(id): Observable<any> {
    return this.db.object('wikis/' + id).snapshotChanges().pipe();
  }

}
