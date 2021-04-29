import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RssFeed } from 'src/app/rss-feed';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RssValidationService } from 'src/app/services/rss-validation.service';
import { RssFeedValidator } from 'src/app/validators/rss-feed-validator';

@Component({
  selector: 'app-dialog-rss-feed',
  templateUrl: './dialog-rss-feed.component.html',
  styleUrls: ['./dialog-rss-feed.component.css']
})
export class DialogRssFeedComponent implements OnInit {

  // Dialog text labels
  title: string = "";
  submitText: string = "";

  // Flags
  displaySpinner: boolean = false;

  // FormGroup and FormControls - https://fiyazhasan.me/asynchronous-validation-in-angulars-reactive-forms-control/

  rssFeed: FormGroup = this.formBuilder.group({

    // URL FormControl
    url: [this.data?.url, { 
      validators: [ Validators.required ], 
      asyncValidators: [ RssFeedValidator.valid(this.rssValidationService) ], 
      updateOn: 'blur' 
    }],

    // Description FormControl
    description: [this.data?.description, { 
      validators: [ Validators.required ]
    }]

  });

  constructor(public dialogRef: MatDialogRef<DialogRssFeedComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: RssFeed = new RssFeed(),
                private formBuilder: FormBuilder,
                private rssValidationService: RssValidationService) {


  }

  ngOnInit(): void {

    if(this.data) {

      // Dialog opened in edit mode
      this.title = "Edit RSS feed";
      this.submitText = "Modify";

    } else {

      // Dialog opened in creation mode
      this.data = new RssFeed();
      this.title = "Add new RSS feed";
      this.submitText = "Add";
    }
    
  }
  
  getSubmitButtonColor() {
    return this.rssFeed.valid ? "accent" : "";
  }

  onSubmit() {
    
    // Update result data 
    this.data.url = this.rssFeed.controls.url.value;
    this.data.description = this.rssFeed.controls.description.value;

    // TODO perform API POST or PATCH here.
    // TODO return the resource URI instead of the data itself.

    // Return updated data
    //this.dialogRef.close(this.data);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

}

