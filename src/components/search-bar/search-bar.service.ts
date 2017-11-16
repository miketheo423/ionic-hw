import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()

export class SearchBarService {

	constructor(private http: Http) {

}
	createAPIObservable(query) {
		return this.http.get(`https://www.reddit.com/search.json?q=${query}&sort=relevance&t=all`);
	}

}