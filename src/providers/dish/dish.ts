
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DishProvider {

  constructor(public http: HttpClient) {
    console.log('Hello DishProvider Provider');
  }

}
