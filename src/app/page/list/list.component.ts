import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';

interface ITableColumn {
  title: string;
  key: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

movie$: Observable<Movie[]> = this.movieService.getAll();

columnKey: string= "";

//filter
phrase: string = '';

filterKey: string = '';

columns: ITableColumn[] = [
  {
    key: 'title',
    title: 'Title',
  },
  {
    key: 'genre',
    title: 'Genre',
  },
  {
    key: 'director',
    title: 'Director',
  },
  {
    key: 'releaseYear',
    title: 'ReleaseYear',
  },
  {
    key: 'studio',
    title: 'Studio',
  },
  {
    key: 'active',
    title: 'Active',
  },

];

  constructor(
    private movieService: MovieService,
  ) {}

  ngOnInit(): void { 
  }

  onDelete(movie: Movie): void {
    this.movieService.delete(movie).subscribe(
      movie => this.movie$ = this.movieService.getAll(),
    );
  }

  onColumnSelect(key: string):void{
    this.columnKey= key
   }
}
