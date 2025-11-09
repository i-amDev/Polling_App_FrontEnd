import {Component, OnInit} from '@angular/core';
import {PollService} from '../poll';
import {Poll} from '../poll.models';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-poll-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './poll-component.html',
  styleUrl: './poll-component.css',
})
export class PollComponent implements OnInit {

  newPoll : Poll = {
    question : '',
    options : [
      {voteOption : '', voteCount : 0},
      {voteOption : '', voteCount : 0}
    ]
  } as any;

  polls : Poll[] = [];

  constructor(private pollService : PollService) {}

  ngOnInit(): void {
        this.loadPolls();
    }

  loadPolls() {
    this.pollService.getAllPolls().subscribe({
      next : (data) => {
        this.polls = data;
      },
      error: (error) => {
        console.error("Error fetching Polls...", error);
      }
    });
  }

  createPoll() {
    this.pollService.createPoll(this.newPoll).subscribe({
      next : (createdPoll) => {
        this.polls.push(createdPoll);
        this.resetPoll();
      },
      error: (error) => {
        console.error("Error creating Poll");
      }
    })
  }

  resetPoll() {
    this.newPoll = {
      question : '',
      options : [
        {voteOption : '', voteCount : 0},
        {voteOption : '', voteCount : 0}
      ]
    } as any;
  }

  trackByIndex(index : number) : number {
    return index;
  }

}
