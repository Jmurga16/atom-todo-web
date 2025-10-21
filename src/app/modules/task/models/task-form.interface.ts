import { FormControl } from "@angular/forms";

export interface TaskForm {
    userId: FormControl<string>;
    title: FormControl<string>;
    description: FormControl<string>;
}