import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/service/movie.service';
import { FilterPipe } from 'src/app/pipe/filter.pipe'


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

  columnKey: string = "";

  //filter
  phrase: string = '';

  filterKey: string = 'title';

  //paginator
  @Input() pageSize: number = 50;

  currentPage: number = 1;

  Movielist: Movie[] | null = null;
  getPageNumberSubState: Boolean = false;
  filterPipe = new FilterPipe()

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

  constructor(private changeDet: ChangeDetectorRef,
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
  }

  onDelete(movie: Movie): void {
    this.movieService.delete(movie).subscribe(
      movie => this.movie$ = this.movieService.getAll(),
    );
  }

  onColumnSelect(key: string): void {
    this.columnKey = key
  }

  //paginator
  getPageNumbers(): number[] {

    if (!this.getPageNumberSubState) {
      this.movie$.subscribe((data) => { this.Movielist = data })
      this.getPageNumberSubState = true
    }

    if ((this.pageSize != 0) && (this.Movielist != null)) {
      let filteredList = this.filterPipe.transform(this.Movielist, this.phrase, this.filterKey)
      const pageCount: number = Math.ceil(filteredList.length / this.pageSize);
      if (pageCount < this.currentPage) {
        this.currentPage = pageCount
        this.changeDet.detectChanges()
      }
      let nums: number[] = [];
      for (let i = 0; i < pageCount; i++) {
        nums[i] = i + 1;
      }
      return nums;
    }
    else {
      return []
    }


  }

  jumpToPage(pageNum: number): void {
    this.currentPage = pageNum;
  }

  jumpForvard(): void {
    if (this.currentPage < this.pageSize - 1) {
      this.currentPage = this.currentPage + 1;
    }



  }

  jumpBackward(): void {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
    }
  }
}
//| slice:((currentPage-1)*pageSize):(currentPage*pageSize)">