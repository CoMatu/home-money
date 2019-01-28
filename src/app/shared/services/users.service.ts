import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {
    user: User;

    constructor(private http: HttpClient) {}

    getUserByEmail(email: string): Observable<any> {
        return this.http.get(`http://localhost:3000/users?email=${email}`)
        .pipe(
            map((user: User[]) => user[0] ? user[0] : undefined)
        );
    }
}
