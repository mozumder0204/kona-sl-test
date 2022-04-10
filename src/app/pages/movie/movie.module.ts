import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RatingModalComponent } from './rating-modal/rating-modal.component';

export const routes = [
  { path: '', component: MovieListComponent, pathMatch: 'full' },
  { path: 'details/:id', component: MovieDetailsComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    RatingModalComponent,
  ],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class MovieModule {}
