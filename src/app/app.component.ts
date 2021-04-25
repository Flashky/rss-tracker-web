import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

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
  name = 'Bobea';

  // Slide toggle
  color: ThemePalette = 'primary';
  isChecked = false;

  // Table
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
