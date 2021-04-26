import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRssFeedComponent } from './dialogs/dialog-rss-feed/dialog-rss-feed.component';
import { RssFeed } from './rss-feed';

export interface PeriodicElement {
  url: string;
  description: String;
  enabled: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {url: "https://hd-olimpo.club/rss/1130.4ff22951d0562feb3b966d7e74172c44", description: 'The Walking Dead', enabled: false},
  {url: "https://hd-olimpo.club/rss/1130.4ff22951d0562feb3b966d7e74172c44", description: 'The Walking Dead', enabled: true},
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'RSS Tracker';

  // Table datasource - Any element inside this will be used for filling the table
  dataSource: RssFeed[] = [
    new RssFeed("https://hd-olimpo.club/rss/1130.4ff22951d0562feb3b966d7e74172c44", "The Walking Dead", false),
    new RssFeed("https://hd-olimpo.club/rss/1130.4ff22951d0562feb3b966d7e74172c44", "Rick & Morty", true)
  ];

  // Slide toggle
  color: ThemePalette = 'primary';
  isChecked = false;

  // Table
  tableColumns: string[] = ['url', 'description', 'isEnabled'];

  constructor(public dialog: MatDialog) { }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogRssFeed() {
    const dialogo = this.dialog.open(DialogRssFeedComponent, {
      data: new RssFeed("", "", true),
      width: '500px'
    });
  }

}
