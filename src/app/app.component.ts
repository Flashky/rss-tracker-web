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

  // Table datasource - Any element inside this will be used for filling the table
  dataSource: MatTableDataSource<RssFeed>;

  // Slide toggle
  color: ThemePalette = 'primary';

  // Table columns
  tableColumns: string[] = ['url', 'description', 'isEnabled'];

  constructor(public dialog: MatDialog) { 

    const rssFeeds: RssFeed[] = [
      new RssFeed("https://hd-olimpo.club/rss/1130.4ff22951d0562feb3b966d7e74172c44", "The Walking Dead", false),
      new RssFeed("https://hd-olimpo.club/rss/1130.4ff22951d0562feb3b966d7e74172c44", "Rick & Morty", true)
    ];

    this.dataSource = new MatTableDataSource(rssFeeds);
  }

  openDialogRssFeed() {
    const dialogo = this.dialog.open(DialogRssFeedComponent, {
      data: new RssFeed("", "", true),
      width: '500px'
    });

    dialogo.afterClosed().subscribe(rssFeed => this.addRow(rssFeed));
  }

  addRow(rssFeed: RssFeed) {
    if (rssFeed != undefined){
        
      //https://stackblitz.com/edit/angular-material-addrow-example
      this.dataSource.data.push(rssFeed);
      this.dataSource.filter = ""; // Forces rendering the table again

    }
  }
 
}
