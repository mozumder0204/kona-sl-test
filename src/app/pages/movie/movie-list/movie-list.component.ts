import { UrlService } from './../../../shared/services/url.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AsyncService } from 'src/app/shared/services/async.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { MovieService } from '../movie.service';
import { Sort } from '@angular/material/sort';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  results: any = [];
  movieListSub: Subscription;
  sortedData: any = [];
  constructor(
    private commonService: CommonService,
    private asyncService: AsyncService,
    private authService: AuthService,
    public urlService: UrlService,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.results = JSON.parse(localStorage.getItem('movie_list') || '[]');
    this.getMovieList();
  }

  getMovieList = () => {
    if (!this.results.length) {
      this.asyncService.start();
      this.movieListSub = this.movieService.getMovie().subscribe(
        (data) => {
          if (data && Object.keys(data).length) {
            this.results = data.items;
            localStorage.setItem('movie_list', JSON.stringify(this.results));
          } else {
            this.commonService.showErrorMsg(`No Data Found !`);
          }
          this.asyncService.finish();
        },
        (error) => {
          this.commonService.showErrorMsg(`Server not respond!`);
        }
      );
    }
  };

  sortData(sort: Sort) {}

  ngOnDestroy() {
    if (this.movieListSub) {
      this.movieListSub.unsubscribe();
    }
    this.asyncService.finish();
  }
}
