import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RssFeed } from 'src/app/rss-feed';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  confirmationButtonText: string = "";

  // Flags
  displaySpinner: boolean = false;

  // FormGroup and form controls:
  rssFeedFormGroup: FormGroup = new FormGroup({

  });


  // FormControls - https://fiyazhasan.me/asynchronous-validation-in-angulars-reactive-forms-control/

  urlFormControl = new FormControl('', {
    validators: [ Validators.required ],                              
    asyncValidators: [ RssFeedValidator.valid(this.rssValidationService) ],
    updateOn: 'blur' // Update only when focus change to avoid validation spamming on an incomplete url
  }
  
  );

  descriptionFormControl = new FormControl('',  {
    validators: [ Validators.required ]
  });

  constructor(public dialogRef: MatDialogRef<DialogRssFeedComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: RssFeed,
                private rssValidationService: RssValidationService) {}

  ngOnInit(): void {

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

  cancel() {
    this.dialogRef.close();
  }

}

