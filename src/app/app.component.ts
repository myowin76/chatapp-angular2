import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

export interface Item {
	message: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
	itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  msg: string = '';
  editMsg: boolean = false;
  editId: number;

  constructor(public af: AngularFireDatabase){
  	this.itemsRef = af.list('items');
  	this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  send(chatMsg: string){
  	
  	this.itemsRef.push({
  		message: chatMsg	
  	});

  	this.msg = '';
  }

  delete(key: string){
  	this.itemsRef.remove(key);
  }

  update(key: string, message: string){
  	this.itemsRef.update(key, { message: message });
  	this.editMsg = false;
  }
}
