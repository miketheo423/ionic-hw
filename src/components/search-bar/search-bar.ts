import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { SearchBarService } from './search-bar.service'


@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.html'
})
export class SearchBarComponent {

	results;
	searchSubject = new Subject();

	findGifs(query) {
		console.log("Finding " + query);
		this.searchSubject.next(query);
	}

  constructor(private searchBarService : SearchBarService) { }

  ngOnInit() {
  	this.searchSubject.debounceTime(400)
  	.distinctUntilChanged()
  	.subscribe(query => {
  		console.log(query);
  		this.searchBarService.createAPIObservable(query)
  		.subscribe(response => {
  			this.results = response.json().data.children
  			console.log(this.results);
  		});
  	})
  }

}
