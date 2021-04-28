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
  hasModification: boolean = false;

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

    if(this.hasModification) {
      //this.getRssFeed(url);
      this.validateRssFeed(url);
    }
  }

  // TODO todo esto se metería en un servicio aparte para realizar las validaciones
  validateRssFeed(url: string) {

    // Start displaying the spinner
    this.displaySpinner = true;
    this.rssValidationService.validate(url)
                              .subscribe( result => {
                                this.isRssValid = result;
                              })
                              .add(() => {
                                this.displaySpinner = false;
                                this.hasModification = false;
                                console.log(this.isRssValid);
                              });

    // Validation example: https://github.com/andre487/feed-validator/blob/master/providers/feed-validator.js#L43
    /*
    const validatorUrl = '/validate';

    const headers = new HttpHeaders()
                        .append("Content-type", "application/x-www-form-urlencoded");

    const params = new HttpParams()
                        .append('output', 'soap12')
                        .append('url', url);
    
    const requestOptions: Object = {
      responseType: "text",
      params: params
    };
     
    this.http.get(validatorUrl, requestOptions).subscribe(
      response => { this.parseXmlResponse(response); }
    ).add(() => {
      this.displaySpinner = false;
      console.log(this.isRssValid);
      this.hasModification = false;
 });
 */
  }

  /*
  parseXmlResponse(response: Object) {
    
    console.log(response);
    const parser = new Parser({ strict: false, trim: true });
    parser.parseString(response.toString(), (err: any, result: any) => this.extractResult(result));
    //["ENV:ENVELOPE"]["ENV:BODY"][0]["M:FEEDVALIDATIONRESPONSE"][0]["M:VALIDITY"][0]
  }

  extractResult(result: any) {
    
    console.log(result)
    this.isRssValid = result["ENV:ENVELOPE"]["ENV:BODY"][0]["M:FEEDVALIDATIONRESPONSE"][0]["M:VALIDITY"][0];
    
  }
*/
  /*
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
                  this.hasModification = false;
             });
  }
*/
  urlModified() {
    this.hasModification = true;
  }

  isDisabled() {
    return ((this.data.url == "") || (this.data.description == "") || (!this.isRssValid));
  }
  
  
  getButtonColor() {
    return this.isDisabled() ? "" : "accent";
  }

  close() {
    this.dialogRef.close();
  }

}

