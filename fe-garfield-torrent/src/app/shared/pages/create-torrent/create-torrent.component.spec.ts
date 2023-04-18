import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTorrentComponent } from './create-torrent.component';

describe('CreateTorrentComponent', () => {
  let component: CreateTorrentComponent;
  let fixture: ComponentFixture<CreateTorrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTorrentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTorrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
