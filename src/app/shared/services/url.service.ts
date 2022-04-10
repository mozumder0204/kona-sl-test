import { Inject, Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AsyncState } from '../state/async.state';
import { StartAsyncLoad, FinishAsyncLoad } from '../actions/async.actions';
import { environment } from 'src/environments/environment';
@Injectable()
export class UrlService {
  constructor(@Inject('BASE_IMAGE_URL') private imageUrl: string) {}

  //   baseHref(): string {
  //     return `/${strip(this.imageUrl, '/')}`;
  //   }

  //   rootRelative(s: string): string {
  //     return `${rstrip(this.baseHref(), '/')}/${lstrip(s, '/')}`;
  //   }

  finalPath(paramPath: string): string {
    return `${this.imageUrl}${paramPath}`;
  }
}
