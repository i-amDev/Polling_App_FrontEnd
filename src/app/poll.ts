import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Poll} from './poll.models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PollService {

  private baseUrl : string = 'http://localhost:9000/api/polls/create';

  private getPollUrl : string = 'http://localhost:9000/api/polls/get';

  private voteUrl : string = 'http://localhost:9000/api/polls/vote';

  constructor(private http : HttpClient) { }

  createPoll(poll : Poll) : Observable<Poll> {
    return this.http.post<Poll>(this.baseUrl, poll);
  }

  getAllPolls() : Observable<Poll[]> {
    return this.http.get<Poll[]>(this.getPollUrl);
  }

  vote(pollId : number, optionIndex : number) : Observable<void> {
    return this.http.post<void>(this.voteUrl, {pollId, optionIndex});
  }
}
