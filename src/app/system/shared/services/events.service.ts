import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseApi } from 'src/app/shared/core/base-api';
import { AppEvent } from '../models/event.model';
import { Injectable } from '@angular/core';

@Injectable()
export class EventsService extends BaseApi {

    constructor(public http: HttpClient) {
        super(http);
    }

    addEvent(event: AppEvent): Observable<AppEvent> {
        return this.post('events', event);
    }

}
