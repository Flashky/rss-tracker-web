import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteRssFeedComponent } from './dialog-delete-rss-feed.component';

describe('DialogDeleteRssFeedComponent', () => {
  let component: DialogDeleteRssFeedComponent;
  let fixture: ComponentFixture<DialogDeleteRssFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteRssFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteRssFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
