import { Component, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogRssFeedComponent } from './dialogs/dialog-rss-feed/dialog-rss-feed.component';
import { RssFeed } from './rss-feed';

export interface PeriodicElement {
  url: string;
  description: String;
  enabled: boolean;
}



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

  constructor(public dialog: MatDialog) { 

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

  openDialogEditRssFeed(rssFeed: RssFeed) {

    const dialogo = this.dialog.open(DialogRssFeedComponent, {
      data: new RssFeed(rssFeed), // Apply defensive copy to avoid modifying the real thing.
      width: '500px'
    });
    
    dialogo.afterClosed().subscribe(updatedRssFeed => this.updateRow(updatedRssFeed));

  }

  openDialogRssFeed() {
    const dialogo = this.dialog.open(DialogRssFeedComponent, {
      data: new RssFeed(),
      width: '500px'
    });

    dialogo.afterClosed().subscribe(rssFeed => this.addRow(rssFeed));
  }

  /**
   * Adds a table row using the input RSS feed data.
   * If no data is passed, nothing will be added.
   * @param rssFeed The new RSS feed to add to the table.
   */
  addRow(rssFeed: RssFeed) {
    
    if (rssFeed){
        
      //https://stackblitz.com/edit/angular-material-addrow-example
      this.dataSource.data.push(rssFeed);
      this.refreshTable();

    }

  }
 
  /**
   * Updates a table row using the input RSS feed data.
   * If no data is passed, nothing will be updated.
   * @param updatedRssFeed The updated RSS feed to modify in the table.
   */
  updateRow(updatedRssFeed: RssFeed) {

    if (updatedRssFeed){

      var itemIndex = this.dataSource.data.findIndex(rssFeed => rssFeed.id == updatedRssFeed.id);
      
      // Update the item
      if(itemIndex > -1) {

        this.dataSource.data[itemIndex] = updatedRssFeed;
        this.refreshTable();
      }

    }
  }

  /**
   * Refreshes the mat-table content.
   */
  refreshTable() {
    this.dataSource.filter = "";
  }
 
}
