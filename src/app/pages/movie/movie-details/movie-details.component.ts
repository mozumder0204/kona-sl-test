import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AsyncService } from 'src/app/shared/services/async.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { UrlService } from 'src/app/shared/services/url.service';
import { RatingModalComponent } from '../rating-modal/rating-modal.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movieList: any = [];
  movieDetails: any;
  movieId: string;
  selectedIndex: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private asyncService: AsyncService,
    public urlService: UrlService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    this.getMovieDetails();
  }

  getMovieDetails = () => {
    this.movieList = JSON.parse(localStorage.getItem('movie_list') || '[]');
    if (!this.movieList.length) {
      this.asyncService.finish();
      this.commonService.showErrorMsg(`No Data Found!`);
    }
    this.movieDetails = this.movieList.filter(
      (cs: any) => cs.id == this.movieId
    )[0];
    this.asyncService.finish();
  };

  OnClickRate = () => {
    const dialogRef = this.dialog.open(RatingModalComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const index = this.movieList.findIndex(
          (cs: any) => cs.id == this.movieId
        );
        this.movieList[index].my_rating = result;
        this.movieList[index].vote_count = this.movieList[index].vote_count + 1;
        localStorage.setItem('movie_list', JSON.stringify(this.movieList));
      }
    });
  };
}
