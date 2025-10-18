import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserSearchResponse } from '../models/user-search-response.interface';
import { User } from '../models/user.interface';


@Injectable({
    providedIn: 'root'
})
export class AuthHttpService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/users`;

    searchUserByEmail(email: string): Observable<UserSearchResponse> {
        const params = new HttpParams().set('email', email);
        return this.http.get<UserSearchResponse>(`${this.apiUrl}/search`, { params });
    }

    createUser(user: string): Observable<User> {
        return this.http.post<User>(this.apiUrl, { email: user });
    }

}