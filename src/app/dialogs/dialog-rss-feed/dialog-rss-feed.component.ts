import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RssFeed } from 'src/app/rss-feed';


@Component({
  selector: 'app-dialog-rss-feed',
  templateUrl: './dialog-rss-feed.component.html',
  styleUrls: ['./dialog-rss-feed.component.css']
})
export class DialogRssFeedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogRssFeedComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: RssFeed) {}

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
