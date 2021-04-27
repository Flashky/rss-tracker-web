import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-rss-feed',
  templateUrl: './dialog-delete-rss-feed.component.html',
  styleUrls: ['./dialog-delete-rss-feed.component.css']
})
export class DialogDeleteRssFeedComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteRssFeedComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: boolean) {}

  ngOnInit(): void {
  }
  
  close() {
    this.dialogRef.close();
  }

}
