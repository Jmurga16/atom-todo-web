import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthHttpService } from '../../services/auth-http.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { User } from '../../models/user.interface';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: HTMLElement;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthHttpService: jasmine.SpyObj<AuthHttpService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthHttpService = jasmine.createSpyObj('AuthHttpService', ['searchUserByEmail', 'createUser']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed', 'close']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthHttpService, useValue: mockAuthHttpService },
        { provide: MatDialog, useValue: mockDialog }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Structure', () => {
    it('should render the login card', () => {
      const card = compiled.querySelector('.login-card');
      expect(card).toBeTruthy();
    });

    it('should display the title "Iniciar Sesión"', () => {
      const title = compiled.querySelector('mat-card-title');
      expect(title?.textContent).toContain('Iniciar Sesión');
    });

    it('should have an email input field', () => {
      const emailInput = compiled.querySelector('input[type="email"]');
      expect(emailInput).toBeTruthy();
    });

    it('should have a submit button', () => {
      const submitButton = compiled.querySelector('button[type="submit"]');
      expect(submitButton).toBeTruthy();
    });
  });

  describe('Email FormControl Validation', () => {
    it('should initialize emailControl as empty and invalid', () => {
      expect(component.emailControl.value).toBe('');
      expect(component.emailControl.invalid).toBeTruthy();
    });

    it('should be invalid when email is empty', () => {
      component.emailControl.setValue('');
      expect(component.emailControl.hasError('required')).toBeTruthy();
    });

    it('should be invalid when email format is incorrect', () => {
      component.emailControl.setValue('invalid-email');
      expect(component.emailControl.hasError('email')).toBeTruthy();
    });

    it('should be valid when email format is correct', () => {
      component.emailControl.setValue('test@example.com');
      expect(component.emailControl.valid).toBeTruthy();
    });
  });

  describe('Error Messages', () => {
    it('should show required error when email is touched and empty', () => {
      component.emailControl.markAsTouched();
      component.emailControl.setValue('');
      fixture.detectChanges();

      const errorElement = compiled.querySelector('mat-error');
      expect(errorElement?.textContent).toContain('El correo es requerido');
    });

    it('should show email format error when email is invalid', () => {
      component.emailControl.markAsTouched();
      component.emailControl.setValue('invalid-email');
      fixture.detectChanges();

      const errorElement = compiled.querySelector('mat-error');
      expect(errorElement?.textContent).toContain('Ingresa un correo válido');
    });
  });

  describe('Form Submission', () => {
    it('should not submit when email is invalid', () => {
      component.emailControl.setValue('');
      component.onSubmit();

      expect(component.emailControl.touched).toBeTruthy();
      expect(component.isLoading).toBeFalsy();
      expect(mockAuthHttpService.searchUserByEmail).not.toHaveBeenCalled();
    });

    it('should mark email as touched when submitting invalid form', () => {
      component.emailControl.setValue('');
      component.onSubmit();

      expect(component.emailControl.touched).toBeTruthy();
    });

    it('should call searchUserByEmail when form is valid', () => {
      const testEmail = 'test@example.com';
      mockAuthHttpService.searchUserByEmail.and.returnValue(of({ exists: true }));

      component.emailControl.setValue(testEmail);
      component.onSubmit();

      expect(mockAuthHttpService.searchUserByEmail).toHaveBeenCalledWith(testEmail);
    });

    it('should navigate to /task when user exists', () => {
      const testEmail = 'test@example.com';
      mockAuthHttpService.searchUserByEmail.and.returnValue(of({ exists: true }));

      component.emailControl.setValue(testEmail);
      component.onSubmit();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/task'], { queryParams: { email: testEmail } });
    });

    it('should open confirmation dialog when user does not exist', () => {
      const testEmail = 'test@example.com';
      mockAuthHttpService.searchUserByEmail.and.returnValue(of({ exists: false }));
      mockDialogRef.afterClosed.and.returnValue(of(false));
      mockDialog.open.and.returnValue(mockDialogRef);

      component.emailControl.setValue(testEmail);
      component.onSubmit();

      expect(mockDialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
        data: {
          title: 'Usuario no encontrado',
          message: `El usuario con email ${testEmail} no existe. ¿Deseas crearlo?`,
          confirmText: 'Crear',
          cancelText: 'Cancelar'
        }
      });
    });

    it('should create user and navigate when dialog is confirmed', fakeAsync(() => {
      const testEmail = 'test@example.com';
      const mockUser: User = { id: 1, email: testEmail };
      mockAuthHttpService.searchUserByEmail.and.returnValue(of({ exists: false }));
      mockAuthHttpService.createUser.and.returnValue(of(mockUser));
      mockDialogRef.afterClosed.and.returnValue(of(true));
      mockDialog.open.and.returnValue(mockDialogRef);

      component.emailControl.setValue(testEmail);
      component.onSubmit();
      tick();

      expect(mockAuthHttpService.createUser).toHaveBeenCalledWith(testEmail);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/task'], { queryParams: { email: testEmail } });
    }));

    it('should not create user when dialog is cancelled', () => {
      const testEmail = 'test@example.com';
      mockAuthHttpService.searchUserByEmail.and.returnValue(of({ exists: false }));
      mockDialogRef.afterClosed.and.returnValue(of(false));
      mockDialog.open.and.returnValue(mockDialogRef);

      component.emailControl.setValue(testEmail);
      component.onSubmit();

      expect(mockAuthHttpService.createUser).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
    });

    it('should set isLoading to false after searchUserByEmail completes', () => {
      const testEmail = 'test@example.com';
      mockAuthHttpService.searchUserByEmail.and.returnValue(of({ exists: true }));

      component.emailControl.setValue(testEmail);
      component.onSubmit();

      expect(component.isLoading).toBeFalsy();
    });
  });

  describe('Loading State', () => {
    it('should initialize isLoading as false', () => {
      expect(component.isLoading).toBeFalsy();
    });

    it('should disable submit button when isLoading is true', () => {
      component.isLoading = true;
      fixture.detectChanges();

      const submitButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
      expect(submitButton.disabled).toBeTruthy();
    });

    it('should show spinner when isLoading is true', () => {
      component.emailControl.setValue('test@example.com');
      component.isLoading = true;
      fixture.detectChanges();

      const spinner = compiled.querySelector('mat-spinner');
      expect(spinner).toBeTruthy();
    });

    it('should show "Ingresar" text when isLoading is false', () => {
      component.isLoading = false;
      fixture.detectChanges();

      const button = compiled.querySelector('button[type="submit"]');
      expect(button?.textContent?.trim()).toContain('Ingresar');
    });
  });

  describe('goToTask', () => {
    it('should navigate to /task with email query param', () => {
      const testEmail = 'test@example.com';
      component.emailControl.setValue(testEmail);

      component.goToTask();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/task'], {
        queryParams: { email: testEmail }
      });
    });

    it('should navigate with current emailControl value', () => {
      const testEmail = 'another@example.com';
      component.emailControl.setValue(testEmail);

      component.goToTask();

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/task'], {
        queryParams: { email: testEmail }
      });
    });
  });
});
