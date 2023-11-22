import { FormControl } from "@angular/forms"

export interface SignupFormInterface {
    firstName: FormControl<string | null>,
    email:  FormControl<string | null>,
    password:  FormControl<string | null>,
    passwordRepeat:  FormControl<string | null>,
}
