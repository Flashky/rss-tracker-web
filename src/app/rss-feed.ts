export class RssFeed {

    id: string = '';
    url: string = ''; 
    description: string = '';
    isEnabled: boolean = true;

    /**
     * Creates a new RssFeed object.
     * @param rssFeed Optional. The RssFeed to copy the data from. The object will take default values if this parameter is not passed.
     */
    constructor(rssFeed?: RssFeed) {
        
        if(rssFeed) {
            console.log(rssFeed.id);
            this.id = rssFeed.id;
            this.url = rssFeed.url;
            this.description = rssFeed.description;
            this.isEnabled = rssFeed.isEnabled;
        }

    }

}
