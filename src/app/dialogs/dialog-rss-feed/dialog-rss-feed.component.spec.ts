import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRssFeedComponent } from './dialog-rss-feed.component';

describe('DialogRssFeedComponent', () => {
  let component: DialogRssFeedComponent;
  let fixture: ComponentFixture<DialogRssFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRssFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRssFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
