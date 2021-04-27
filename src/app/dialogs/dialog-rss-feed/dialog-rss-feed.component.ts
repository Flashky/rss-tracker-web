import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RssFeed } from 'src/app/rss-feed';


@Component({
  selector: 'app-dialog-rss-feed',
  templateUrl: './dialog-rss-feed.component.html',
  styleUrls: ['./dialog-rss-feed.component.css']
})
export class DialogRssFeedComponent implements OnInit {

  title: string = "";
  confirmationButtonText: string = "";

  constructor(public dialogRef: MatDialogRef<DialogRssFeedComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: RssFeed) {}

  ngOnInit(): void {
    
    console.log(this.data);

    if(this.data) {

      // Dialog opened in edit mode
      this.title = "Edit RSS feed";
      this.confirmationButtonText = "Modify";

    } else {

      // Dialog opened in creation mode
      this.data = new RssFeed();
      this.title = "Add new RSS feed";
      this.confirmationButtonText = "Add";
    }
    
  }

  isDisabled() {
    return ((this.data.url == "") || (this.data.description == ""));
  }
  
  
  getButtonColor() {
    return this.isDisabled() ? "" : "accent";
  }

  close() {
    this.dialogRef.close();
  }

}
