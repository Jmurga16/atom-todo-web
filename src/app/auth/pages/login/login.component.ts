import { Component, inject } from "@angular/core";
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialog } from "@angular/material/dialog";
import { finalize } from "rxjs";
import { AuthHttpService } from "../../services/auth-http.service";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { ConfirmDialogData } from "../../../shared/components/confirm-dialog/models/confirm-dialog-data.interface";

const ANGULAR_MODULES = [
    ReactiveFormsModule,
    FormsModule
];

const MATERIAL_MODULES = [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
];

@Component({
    selector: "app-login",
    standalone: true,
    imports: [
        ANGULAR_MODULES,
        ...MATERIAL_MODULES
    ],
    templateUrl: "./login.component.html",
    styleUrl: "./login.component.scss"
})
export class LoginComponent {

    private router = inject(Router);
    private authHttpService = inject(AuthHttpService);
    private dialog = inject(MatDialog);

    emailControl = new FormControl<string>("", [
        Validators.required,
        Validators.email
    ]);

    isLoading = false;

    onSubmit(event?: Event): void {
        event?.preventDefault();

        if (this.emailControl.invalid) {
            this.emailControl.markAsTouched();
            return;
        }

        this.isLoading = true;
        const email = this.emailControl.value;

        this.authHttpService.searchUserByEmail(email!)
            .pipe(finalize(() => { this.isLoading = false; }))
            .subscribe({
                next: (response) => {
                    if (response.exists) {
                        this.goToTask();
                    }
                    else {
                        this.openModalToCreateUser(email!);
                    }
                }
            });

    }

    private openModalToCreateUser(email: string): void {
        const dialogData: ConfirmDialogData = {
            title: 'Usuario no encontrado',
            message: `El usuario con email ${email} no existe. ¿Deseas crearlo?`,
            confirmText: 'Crear',
            cancelText: 'Cancelar'
        };

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.createUserAndNavigate(email);
            }
        });
    }

    private createUserAndNavigate(email: string): void {
        this.isLoading = true;
        this.authHttpService.createUser(email)
            .pipe(finalize(() => { this.isLoading = false; }))
            .subscribe({
                next: () => {
                    this.goToTask();
                }
            });
    }

    goToTask() {
        this.router.navigate(["/task"], { queryParams: { email: this.emailControl.value } });
    }
}
