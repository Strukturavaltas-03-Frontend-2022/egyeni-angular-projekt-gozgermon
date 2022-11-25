import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';


@Component({
  selector: 'app-list-editor',
  templateUrl: './list-editor.component.html',
  styleUrls: ['./list-editor.component.scss']
})
export class ListEditorComponent implements OnInit {

  movie$: Observable<Movie> = this.ar.params.pipe(
    switchMap( (params: { [x: string]: number; }) => 
    this.movieService.get(params['id']) ),
  );

  constructor(
    private ar: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(movieEditorForm:NgForm,movie:Movie):void{
    if(movie.id===0){
      this.movieService.create(movie).subscribe(
        movie => this.router.navigate(['/', 'list'])
      )
    }
    else{
      this.movieService.update(movie).subscribe(
        movie => this.router.navigate(['/', 'list'])
      )
    }
   
  }

}
