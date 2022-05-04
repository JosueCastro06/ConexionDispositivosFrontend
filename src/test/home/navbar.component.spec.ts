/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';


import {NavbarComponent} from '../../app/home/navbar/navbar.component';

describe('Test - NavBarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        HttpClientTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });
});
