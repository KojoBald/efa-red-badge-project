import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";

import { User } from '../models/user';
import { SideUser } from '../models/sidebarUser';
import { Channel } from '../models/channel';
import { Message } from '../models/Message';
import { UserLogin } from '../models/UserLogin';
import { UserUpdate} from '../models/userUpdate';


 const LoginOptions =
{
  headers: new HttpHeaders(
    {
      "Content-Type": "application/json",
    })
}

const httpOptions =
{
  headers: new HttpHeaders(
    {
      "Content-Type": "application/json",
      "Authorization" : sessionStorage.getItem("token") 
    })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService 
{
  private URL: string = 'http://localhost:8080' /*'https://www.chapp-backend.herokuapp.com'*/;
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}


  /***************************************************************
   * User
   ***************************************************************/
  signUp(user: User): any
  {
    // console.log(user)
    return this.http.post<User>(`${this.URL}/user/`, user, LoginOptions)
    .pipe(catchError(this.handleError("signUp")),tap(user => {return user}))
  }

  login(user: UserLogin): any
  {
    console.log(user)
    return this.http.post<UserLogin>(`${this.URL}/user/login`, user, LoginOptions)
    .pipe(catchError(this.handleError("Fetched")),tap(user => {return user}))
  }

  updateUser(user: UserUpdate, id: string): any
  {
    return this.http.put<UserUpdate>(`${this.URL}/user/${id}`, user, httpOptions)
    .pipe(catchError(this.handleError('updateFetch')),tap(user => {return user}))
  }

  deleteUser(id: number): any
  {
    return this.http.delete(`${this.URL}/user/${id}`, httpOptions)
    .pipe(catchError(this.handleError('deleteFetched')),tap(user => {return user}))
  }

  getUser(id: number): any
  {
    return this.http.get<User>(`${this.URL}/user/${id}`, httpOptions)
    .pipe(catchError(this.handleError('getChannelFetch')),tap(user => {return user}))
  }

  getUsersChannels(id: number): any
  {
    return this.http.get<Channel>(`${this.URL}/${id}/channels`, httpOptions)
    .pipe(catchError(this.handleError('getChannelFetch')),tap(user => {return user}))
  }

  /***************************************************************
   * Channel
   ***************************************************************/
  createChannel(user: Channel): any
  {
    console.log(user)
    return this.http.post<Channel>(`${this.URL}/channel/`, user, httpOptions)
    .pipe(catchError(this.handleError('createFetch')),tap(user => {return user}))
  }

  getChannel(id): any
  {
    return this.http.get<Channel>(`${this.URL}/channel/${id}`, httpOptions)
    .pipe(catchError(this.handleError('getChannelFetch')),tap(user => {return user}))
  }

  updateChannel(user: Channel, id: number): any
  {
    return this.http.put<Channel>(`${this.URL}/channel/${id}`, user, httpOptions)
    .pipe(catchError(this.handleError('updateChannelFetch')),tap(user => {return user}))
  }

  deleteChannel(id: number): any
  {
    return this.http.delete<Channel>(`${this.URL}/channel/${id}`, httpOptions)
    .pipe(catchError(this.handleError('DeleteChannelFetch')),tap(user => {return user}))
  }

  getChannelUsers(id: number): any
  {
    return this.http.get<Channel>(`${this.URL}/channel/${id}/users`, httpOptions)
    .pipe(catchError(this.handleError('getChannelUserFetch')),tap(user => {return user}))
  }

  inviteChannelUsers(user: Channel): any
  {
    return this.http.put(`${this.URL}/channel/:id/invite`, user, httpOptions)
    .pipe(catchError(this.handleError('inviteChannelFetch')),tap(user => {return user}))
  }

  /**************************************************************
   * UserMessages 
  ***************************************************************/

 sendDirectMessage(user: Message): any
 {
   return this.http.post<Message>(`${this.URL}/user/message/`, user, httpOptions)
   .pipe(catchError(this.handleError('inviteChannelFetch')),tap(user => {return user}))
 }

 updateMessage(user: Message, id: number): any
  {
    return this.http.put<Message>(`${this.URL}/user/message/${id}`, user, httpOptions)
    .pipe(catchError(this.handleError('updateChannelFetch')),tap(user => {return user}))
  }

  deleteDM(id: number): any
  {
    return this.http.delete<Message>(`${this.URL}/user/message/${id}`, httpOptions)
    .pipe(catchError(this.handleError('DeleteChannelFetch')),tap(user => {return user}))
  }

  getDMs(id: number): any
  {
    return this.http.get<Message>(`${this.URL}/user/message/all`, httpOptions)
    .pipe(catchError(this.handleError('getChannelUserFetch')),tap(user => {return user}))
  }

  getmessageSender(id: number): any
  {
    return this.http.get<SideUser>(`${this.URL}/user/${id}/message/`, httpOptions)
    .pipe(catchError(this.handleError('getFetch')),tap(user => {return user}))
  }

  /**************************************************************
   * ChannelMessages
  ***************************************************************/

  sendChannelMessage(user: Message): any
  {
   return this.http.post<Message>(`${this.URL}/user/`, user, httpOptions)
   .pipe(catchError(this.handleError('inviteChannelFetch')),tap(user => {return user}))
  }

  updateChannelMessage(user: Message): any
  {
    return this.http.put<Message>(`${this.URL}/user/`, user, httpOptions)
    .pipe(catchError(this.handleError('updateChannelFetch')),tap(user => {return user}))
  }

  deleteChannelMessage(id: number): any
  {
    return this.http.delete<Message>(`${this.URL}/user/`, httpOptions)
    .pipe(catchError(this.handleError('DeleteChannelFetch')),tap(user => {return user}))
  }

  getChannelMessages(id: number): any
  {
    return this.http.get<Message>(`${this.URL}/user/`, httpOptions)
    .pipe(catchError(this.handleError('getChannelUserFetch')),tap(user => {return user}))
  }
}
 