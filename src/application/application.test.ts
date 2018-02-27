import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';


import { ApplicationComponent } from './application.component';

let compInstance: ApplicationComponent;
let fixture: ComponentFixture<ApplicationComponent>;
let el: HTMLElement;
const oldResetTestingModule = TestBed.resetTestingModule;

describe('Component : ApplicationComponent', () => {
  afterAll(() => {
      TestBed.resetTestingModule = oldResetTestingModule;
      TestBed.resetTestingModule();
  });
  beforeAll(() => {

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
        imports: [
            BrowserModule,
            RouterTestingModule,
            HttpModule
        ],
        declarations: [
          ApplicationComponent,
        ],
        providers: [ ]
    });

    TestBed.resetTestingModule = () => TestBed;
  });
  beforeEach(() => {
      fixture = TestBed.createComponent(ApplicationComponent);
      compInstance = fixture.componentInstance;
  });
  it('should inject the component', () => {
    expect(compInstance).toBeTruthy();
  });
});
