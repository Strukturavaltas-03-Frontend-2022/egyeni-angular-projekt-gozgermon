import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';

@Pipe({
  name: 'sorter'
})
export class SorterPipe implements PipeTransform {

  transform(value: Movie[]|null,key:string): Movie[]|null {
    if (!Array.isArray(value) || !key) {
      return value
    }

    return value.sort((a, b) => {
      if (typeof a[key]==='number' && typeof b[key]==='number'){
        return a[key]-b[key];
      }else{
        return String(a[key]).toLowerCase().localeCompare(String(b[key]).toLowerCase());
      }
    })
  }

}
