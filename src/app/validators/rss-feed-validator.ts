import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { RssValidationService } from "../services/rss-validation.service";

export class RssFeedValidator {

    /**
     * Validates a form control value to be a valid RSS feed using the service passed as a parameter.
     * @param validationService 
     * @returns An observable function that emits validation errors if present, otherwise null.
     */
    static valid(rssValidationService: RssValidationService): AsyncValidatorFn {

        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            
            const url: string = control.value;
            console.log("Validating... "+ url);

            // Call to service to obtain validation errors on the control value
            return rssValidationService.validate(url).pipe(
                map(
                    (result: boolean) =>  {
                        console.log(result);
                        return result ? null : { invalidRss: true }
                    }
                )
            );
            
        };

    }
}
