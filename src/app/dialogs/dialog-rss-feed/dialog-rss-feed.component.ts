import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError} from '@angular/material/dialog';
import { RssFeed } from 'src/app/rss-feed';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-rss-feed',
  templateUrl: './dialog-rss-feed.component.html',
  styleUrls: ['./dialog-rss-feed.component.css']
})
export class DialogRssFeedComponent implements OnInit {

  title: string = "";
  confirmationButtonText: string = "";
  displaySpinner: boolean = false;
  isValidUrl: boolean = true;
   
  // FormControls
  urlControl = new FormControl('');

  constructor(public dialogRef: MatDialogRef<DialogRssFeedComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: RssFeed,
                private http: HttpClient) {}

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

    this.getRssFeed(url);
      
  }

  getRssFeed(url: string) {
    
    const requestOptions: Object = {
      responseType: "text"
    };

    this.displaySpinner = true;

    this.http.get(url, requestOptions)
              .subscribe( 
                  // Log the result or error
                  response => { console.log(response); this.isValidUrl = true },
                  error => { 
                    const httpError: HttpErrorResponse = error;
                    
                    if(httpError.status == 404) {
                      console.log("Not found");
                    }

                    console.log(error); 
                    this.isValidUrl = false;
                  }
                ).add(() => {
                  this.displaySpinner = false;
                  console.log(this.isValidUrl);
                  this.urlControl.markAsTouched();
             });
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

