import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User, UserSearchResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AuthHttpService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiUrl}/api/users`;

    searchUserByEmail(email: string): Observable<UserSearchResponse> {
        const encodedEmail = encodeURIComponent(email);
        return this.http.get<UserSearchResponse>(`${this.apiUrl}/${encodedEmail}`);
    }

    createUser(user: string): Observable<User> {
        return this.http.post<User>(this.apiUrl, { email: user });
    }

}