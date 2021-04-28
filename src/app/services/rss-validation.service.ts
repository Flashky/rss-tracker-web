import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parser } from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class RssValidationService {

  constructor(private http: HttpClient) { }

  /**
   * Validates the input RSS feed using the third party W3C validation service.
   * @param rssFeedUrl The RSS feed to validate
   * @returns An `Observable<boolean>` for the validation result. The validation result will be either `true` if the RSS feed is valid or `false` otherwise.
   */
  validate(rssFeedUrl: string): Observable<boolean> {
    
    const observableValidation = new Observable<boolean>( (observer) => {

      // Proxy inverse - Real validatorUrl: "http://validator.w3.org/feed/check.cgi"
      const validatorUrl = '/validate';

      // Prepare request parameters
      const queryParameters = new HttpParams()
        .append('output', 'soap12')
        .append('url', rssFeedUrl);

      const requestOptions: Object = {
        responseType: "text",
        params: queryParameters
      };

      // Subscribe to W3C validator service
      this.http.get(validatorUrl, requestOptions)
                .subscribe(response => {

                  // Once validation service has replied, parse its response and pass it to the observer 
                  observer.next(this.parseXmlResponse(response)); 
                  observer.complete();

                });
                
    });

    return observableValidation;

  }

  /**
   * Evaluates the XML response `<m:validity>` field value.
   * @param response The W3C RSS feed validator service response as XML text.
   * @returns A `boolean` that will be `true` if `<m:validity>` value is also `true`. Will be `false` in any other cases.
   */
  private parseXmlResponse(response: Object): boolean {

    console.log(response);
    const parser = new Parser({ strict: false, trim: true });
    
    var isRssValid: boolean = false;
    parser.parseString(response.toString(),  (err: any, result: any) => {
      if(!err) {
        isRssValid = result["ENV:ENVELOPE"]["ENV:BODY"][0]["M:FEEDVALIDATIONRESPONSE"][0]["M:VALIDITY"][0];
      }
    });
    
    return isRssValid;
  }





}
