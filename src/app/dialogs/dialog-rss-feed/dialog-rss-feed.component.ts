import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError} from '@angular/material/dialog';
import { RssFeed } from 'src/app/rss-feed';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import {Parser} from 'xml2js';
import { RssValidationService } from 'src/app/services/rss-validation.service';

@Component({
  selector: 'app-dialog-rss-feed',
  templateUrl: './dialog-rss-feed.component.html',
  styleUrls: ['./dialog-rss-feed.component.css']
})
export class DialogRssFeedComponent implements OnInit {

  // Dialog text labels
  title: string = "";
  confirmationButtonText: string = "";

  // Flags
  displaySpinner: boolean = false;
  isRssValid: boolean = true;
  urlHasChanged: boolean = false;

  // FormControls
  urlControl = new FormControl('');

  constructor(public dialogRef: MatDialogRef<DialogRssFeedComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: RssFeed,
                private http: HttpClient,
                private rssValidationService: RssValidationService) {}

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
  
  checkUrl(event: Event) {
    
    const url = (event.target as HTMLInputElement).value;

    if(this.urlHasChanged) {
      //this.getRssFeed(url);
      this.validateRssFeed(url);
    }
  }

  // TODO todo esto se metería en un servicio aparte para realizar las validaciones
  validateRssFeed(url: string) {

    // Start displaying the spinner
    this.displaySpinner = true;
    this.isRssValid = false;
    this.rssValidationService.validate(url)
                              .subscribe( (result: boolean) => {
                                this.isRssValid = result;
                              })
                              .add(() => {

                                // Stop spinner animation
                                this.displaySpinner = false;
                                this.urlHasChanged = false;
                                
                                console.log(this.isRssValid);
                              });

  }

  urlModified() {
    this.urlHasChanged = true;
  }

  isDisabled() {
    return ((this.data.url == "") || (this.data.description == "") || (!this.isRssValid));
  }
  
  
  getButtonColor() {
    return this.isDisabled() ? "" : "accent";
  }

  close() {

    if(this.urlHasChanged) {
      this.validateRssFeed(this.data.url);
    }

    if(this.isRssValid) {
      this.dialogRef.close();
    }
  
  }

}

