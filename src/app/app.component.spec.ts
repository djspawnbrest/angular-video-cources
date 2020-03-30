import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthService } from './auth/services';

class MockAuthService extends AuthService {}

describe('AppComponent', () => {
  let app: AppComponent ;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: AuthService, useClass: MockAuthService }],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', async(() => {
    expect(app).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-header'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('router-outlet'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-footer'))).toBeTruthy();
  }));

  it('should call isAuthenticated of AuthService', () => {
      const spyIsAuthenticated = spyOn(MockAuthService.prototype, 'isAuthenticated');

      app.isAuthenticated();
      expect(spyIsAuthenticated).toHaveBeenCalled();
  });
});
