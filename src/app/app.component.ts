import { Component, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogDeleteRssFeedComponent } from './dialogs/dialog-delete-rss-feed/dialog-delete-rss-feed.component';
import { DialogRssFeedComponent } from './dialogs/dialog-rss-feed/dialog-rss-feed.component';
import { RssFeed } from './model/feed/rss-feed';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'RSS Tracker';
  
  // Slide toggle
  color: ThemePalette = 'primary';

  // Table datasource - Any element inside this will be used for filling the table
  dataSource: MatTableDataSource<RssFeed>;

  // Table columns
  tableColumns: string[] = ['url', 'description', 'isEnabled'];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) { 

    const rssFeeds: RssFeed[] = [];

    var rssFeed: RssFeed = new RssFeed();
    rssFeed.id = "1";
    rssFeed.url = "https://hd-olimpo.club/rss/1130.4ff22951d0562feb3b966d7e74172c44";
    rssFeed.description = "The Walking Dead";
    rssFeed.isEnabled = false;
    rssFeeds.push(rssFeed);
    console.log(rssFeed);

    rssFeed= new RssFeed();
    rssFeed.id = "2";
    rssFeed.url = "https://hd-olimpo.club/rss/1130.4ff22951d0562feb3b966d7e74172c44";
    rssFeed.description = "Rick & Morty";
    rssFeeds.push(rssFeed);
    console.log(rssFeed);

    this.dataSource = new MatTableDataSource(rssFeeds);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Opens a dialog to confirm the deletion of an existing RSS feed.
   * After the dialog is closed, the RSS feed item will be deleted or not depending on the selection.
   * @param rssFeed The RSS feed to remove.
   */
  openDialogDeleteRssFeed(rssFeed: RssFeed) {

    const dialogo = this.dialog.open(DialogDeleteRssFeedComponent, {
      width: '500px'
    });

    dialogo.afterClosed().subscribe(confirmedDeletion => { if(confirmedDeletion) this.removeRssFeed(rssFeed) } );
  }

  /**
   * Opens a dialog to update an existing RSS feed.
   * After the dialog is closed, the RSS feed item will be updated at the table.
   * @param rssFeed The RSS feed to update.
   */
  openDialogEditRssFeed(rssFeed: RssFeed) {

    const dialogo = this.dialog.open(DialogRssFeedComponent, {
      data: new RssFeed(rssFeed), // Apply defensive copy to avoid modifying the real thing.
      width: '500px'
    });
    
    dialogo.afterClosed().subscribe(updatedRssFeed => this.updateRssFeed(updatedRssFeed));

  }

  /**
   * Opens a dialog to create a new RSS feed.
   * After the dialog is closed, the RSS feed item will be created and added to the table.
   */
  openDialogRssFeed() {
    const dialogo = this.dialog.open(DialogRssFeedComponent, {
      width: '500px'
    });

    dialogo.afterClosed().subscribe(rssFeed => this.addRssFeed(rssFeed));
  }

  /**
   * Adds a new RSS feed.
   * If no data is passed, nothing will be added.
   * @param rssFeed The new RSS feed to add to the table.
   */
  addRssFeed(rssFeed: RssFeed) {
    
    if (rssFeed){
        
      //https://stackblitz.com/edit/angular-material-addrow-example
      this.dataSource.data.push(rssFeed);
      this.refreshTable();
      this.displayNotification("RSS feed added");
    }

  }
 
  /**
   * Updates an existing RSS feed.
   * If no data is passed, nothing will be updated.
   * @param updatedRssFeed The updated RSS feed to modify in the table.
   */
  updateRssFeed(updatedRssFeed: RssFeed) {

    if (updatedRssFeed){

      var itemIndex = this.dataSource.data.findIndex(rssFeed => rssFeed.id == updatedRssFeed.id);
      
      // Update the item
      if(itemIndex > -1) {

        this.dataSource.data[itemIndex] = updatedRssFeed;
        this.refreshTable();
        this.displayNotification("RSS feed updated");
      }

    }

  }
  
  /**
   * Removes a RSS feed.
   * If no data is passed nothing will be removed.
   * @param rssFeed The RSS feed to remove from the table.
   */
  removeRssFeed(rssFeed: RssFeed): void {
    
    if (rssFeed){

      var itemIndex = this.dataSource.data.findIndex(rssFeedItem => rssFeedItem.id == rssFeed.id);
      
      // Remove the item
      if(itemIndex > -1) {

        this.dataSource.data.splice(itemIndex,1);
        this.refreshTable();
        this.displayNotification("RSS feed deleted");
      }

    }

  }

  /**
   * Refreshes the mat-table content.
   */
  refreshTable() {
    this.dataSource.filter = "";
  }
 
  displayNotification(text: string) {

    this.snackBar.open(text, "Close", { duration: 5000});
  }
}
