import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTorrentComponent } from './edit-torrent.component';

describe('EditTorrentComponent', () => {
  let component: EditTorrentComponent;
  let fixture: ComponentFixture<EditTorrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTorrentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTorrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
