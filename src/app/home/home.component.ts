import { Component ,OnInit,OnDestroy,EventEmitter} from '@angular/core';
import {DataService} from '../service/data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'; // Import DomSanitizer and SafeHtml
import { Subscription, Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
    victimsCount: number = 0;
    public eventEmitter = new EventEmitter<void>();
    private subscription: Subscription = new Subscription();
    //@Output() eventEmitter = new EventEmitter<void>();
    //params
    htmlContent: SafeHtml = ''; // Use SafeHtml type to store sanitized HTML
    result: any;
    NodeLevelList: any = [
        '.war-victims-card',
        '.war-victims-card__image-container',
        '.war-victims-card__content'];
    data: string[][] = [];
    isLoading: boolean = false; // Initially set to false
    showContent = true;
    title = 'Victims of 7.10';
    filter: any = () => { }
    searchQuery = '';
    selectedOption = '';
    options: string[] = []; // Options for the combobox
    elements = ''; // Elements to filter
    filteredElements: SafeHtml = ''; // Filtered elements
    documentHtmlContent: SafeHtml = '';
    elementsRetrieved: EventEmitter<string> = new EventEmitter<string>(); // EventEmitter to notify about retrieved elements
    codeTranslateDictionary: Record<string, any> = {
        a: { combo: 'All', image: '' },
        c: { combo: 'Civilians', image: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/1280px-Flag_of_Israel.svg.png')" },
        s: { combo: 'Soldiers', image: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Badge_of_the_Israeli_Defense_Forces_2022_version.svg/1024px-Badge_of_the_Israeli_Defense_Forces_2022_version.svg.png')" },
        p: { combo: 'Police', image: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Emblem_of_Israel_Police_Blue.svg/1024px-Emblem_of_Israel_Police_Blue.svg.png')" },
        r: { combo: 'Rescue', image: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Magen_David_Adom.svg/1200px-Magen_David_Adom.svg.png'),url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/FireDepIsrael.svg/1024px-FireDepIsrael.svg.png'" }
    };
     extractedTitle :string = '';
    constructor(
        private dataService: DataService,
        private sanitizer: DomSanitizer // Inject DomSanitizer
    ) { }

    //methods

    ngOnInit() {
        console.log("ngOnInit");
        
        const indexRoot: string = "https://raw.githubusercontent.com/yanivdg/Victims07102023War/main/index.html";
        this.dataService.getData(indexRoot).subscribe(
            (htmlDoc: any) => {
              this.extractedTitle = this.extractTextAfterKeyword(this.dataService.getContentByElementFromHTML(htmlDoc,"title").text,"ver");
            },
            (error) => {
              console.error('Error fetching file:', error);
            });
            
        this.scraber();
        this.elementsRetrieved.subscribe((elements: string) => {
            this.victimsCount = this.CastStringToElements(elements).length;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

     extractTextAfterKeyword(text: string, keyword: string): string {
        const keywordIndex = text.indexOf(keyword);
        if (keywordIndex !== -1) {
            return text.substring(keywordIndex + keyword.length).trim();
        } else {
            return "Keyword not found in the text.";
        }
    }

    CastElementsToString(elements: Element[]): string {
        return elements.map(element => element.outerHTML).join('');
    }

    CastStringToElements(htmlString: string): Element[] {
        let parser = new DOMParser();
        let doc = parser.parseFromString(htmlString, "text/html");
        return Array.
            from(Array.from(doc.body.childNodes)).
            filter(node => node instanceof Element) as Element[];

    }
    appbuttonclicked() {
        this.subscription = this.eventEmitter.subscribe(() => {
            this.scraber();
        });
    }
    filterElements() {
        // Create a new DOM parser
        const parser = new DOMParser();
        // Parse the HTML string
        const doc = parser.parseFromString(this.elements, 'text/html');
        // Get all elements with the class 'war-victims-card'
        const _elements = doc.querySelectorAll(this.NodeLevelList[0]);
        // Filter elements based on the search query and sort value
        const filteringQuery = Array.from(_elements).filter((element: any) => {
            const filterValue = element.getAttribute('data-filter');
            const sort = this.selectedOption === 'All' ?
                this.selectedOption : this.codeTranslateDictionary[element.getAttribute('data-sort').trim()].combo;

            return filterValue.includes(this.searchQuery) && sort === this.selectedOption;
        });

        //
        const records = this.addPropertyToElement(this.CastElementsToString(filteringQuery), 'background-image', 'image');
        const tblRecords = this.convertToTable(records);
        this.filteredElements = this.sanitizer.bypassSecurityTrustHtml(tblRecords);

        //count filtered list
        this.victimsCount = filteringQuery.length;;
    }

    generateOptions(htmlString: string): void {
        // Create a new DOM parser
        const parser = new DOMParser();
        // Parse the HTML string
        const doc = parser.parseFromString(htmlString, 'text/html');
        // Get all elements with the class 'war-victims-card'
        const elements = doc.querySelectorAll(this.NodeLevelList[0]);
        // Clear the options array
        const optionsList: Set<string> = new Set();//Options for the combobox
        optionsList.add(this.codeTranslateDictionary['a'].combo);
        // Iterate over each element
        elements.forEach((element: any) => {
            // Get the sort value
            const sortValue = element.getAttribute('data-sort');
            // Add the sort value to the options set
            if (sortValue)
                optionsList.add(this.codeTranslateDictionary[sortValue.trim()].combo);
        });
        this.options = Array.from(optionsList);
        this.selectedOption = this.codeTranslateDictionary[Object.keys(this.codeTranslateDictionary)[0]].combo;
    }

    /*
    
    parseHtml(htmlString: string) {
      // Create a new DOM parser
      const parser = new DOMParser();
      // Parse the HTML string
      const doc = parser.parseFromString(htmlString, 'text/html');
      // Get all elements with the class 'war-victims-card'
      const elements = doc.querySelectorAll('.war-victims-card');
      // Generate the options and elements
      elements.forEach(element => {
        // Get the sort value
        const sortValue = element.getAttribute('data-sort');
        // Add the sort value to the options
        if (sortValue) {this.options.push(sortValue);}
        // Add the element to the elements
        //this.elements.push(element.outerHTML);
      });
    }
    */

    convertToTable(htmlString: string): string {
        // Create a new DOM parser
        const parser = new DOMParser();
        // Parse the HTML string
        const doc = parser.parseFromString(htmlString, 'text/html');
        // Get all elements with the class 'war-victims-card'
        const parentDivs = doc.querySelectorAll(this.NodeLevelList[0]);
        // Create a new table
        const table = doc.createElement('table');
        // Iterate over each element
        parentDivs.forEach(parentDiv => {
            // Get the image container and content divs
            const imageContainer = parentDiv.querySelector(this.NodeLevelList[1]);
            const content = parentDiv.querySelector(this.NodeLevelList[2]);
            // Create a new row and cells for the image and content
            const row = doc.createElement('tr');
            const imageCell = doc.createElement('td');
            const contentCell = doc.createElement('td');
            // Append the image container and content divs to the cells
            if (imageContainer) imageCell.appendChild(imageContainer);
            if (content) contentCell.appendChild(content);
            // Append the cells to the row
            row.appendChild(imageCell);
            row.appendChild(contentCell);
            // Append the row to the table
            table.appendChild(row);
        });
        // Return the outer HTML of the table
        return table.outerHTML;
    }


    addPropertyToElement(htmlString: string, PropertyName: string, PropertyValue: string): string {
        // Create a new DOM parser
        const parser = new DOMParser();
        // Parse the HTML string
        const doc = parser.parseFromString(htmlString, 'text/html');
        // Get all elements with the class 'war-victims-card'
        const elements = doc.querySelectorAll(this.NodeLevelList[0]);
        elements.forEach((element: any) => {
            const content = element.querySelector(this.NodeLevelList[2]);
            // Get the sort value
            const value = element.getAttribute('data-sort');
            // Set a semi-transparent white background (e.g., 80% opacity)
            content.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // Adjust the last value for opacity
            // Set text color to black for better visibility
            content.style.color = 'red';
            content.style.textAlign = 'right'; // Align text to the right
            // Add the sort value to the options set
            content.style.backgroundImage = this.codeTranslateDictionary[value.trim()][PropertyValue];
            content.style.backgroundSize = 'cover';
            content.style.width = '300';
            content.style.height = '150'; /* Set the height of the container */
            content.style.backgroundPosition = 'center'; /* Center the background image */
            // Add a text shadow to simulate blood droplets effect
            content.style.textShadow = '0 0 5px #800'; // Adjust the color and blur radius as needed
        });
        return this.CastElementsToString(Array.from(elements));
    }

    scraber(): void {
        this.isLoading = true;
        const urlvalue: string = 'https://www.haaretz.co.il/news/2023-10-12/ty-article-magazine/0000018b-1367-dcc2-a99b-17779a0a0000';
        const classorid: string = '.war-victims-cards-container';
        const jsonbody = { url: urlvalue, classorid: classorid };

        const kidnappedurl = !window.location.href.includes('localhost') ?
            'https://raw.githubusercontent.com/yanivdg/Victims07102023War/main/Python/kidnapped.html' :
            'https://raw.githubusercontent.com/yanivdg/Victims07102023War/main/Python/dev.html';
        this.dataService.getData(kidnappedurl)
            .subscribe(
                (data: string) => {
                    this.documentHtmlContent = this.sanitizer.bypassSecurityTrustHtml(data);; // Assign fetched HTML content to the variable
                    console.log(this.htmlContent); // You can handle or display the HTML content here
                },
                error => {
                    console.error('Error fetching HTML content:', error);
                }
            );

        /*
        this.dataService.getRequest('https://raw.githubusercontent.com/yanivdg/Victims07102023War/main/Python/kidnapped.html').pipe(
         switchMap((response:any) =>
         {
           this.documentHtmlContent = this.sanitizer.bypassSecurityTrustHtml(response);
           return new Observable(observer => {
             observer.next(this.documentHtmlContent ); // Pass the modified response downstream
             observer.complete(); // Complete the Observable
           });
         })
         ).subscribe(
           (response: any) => {
             // Handle the response or perform subsequent operations if needed
             this.elementsRetrieved.emit(response);
           },
           (error) => {
             console.error('Error:', error);
             // Handle errors
           });
           */
        this.dataService.postRequest(jsonbody).pipe(
            switchMap((response: any) => {
                // Handle the response here
                const body = response.body;
                this.elements = this.addPropertyToElement(body[0].element, 'background-image', 'image');
                const records = this.convertToTable(this.elements);
                this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(records);
                this.generateOptions(this.elements);
                this.isLoading = false;
                // Assuming 'modifiedProcessedResponse' is your manipulated data
                return new Observable(observer => {
                    observer.next(this.elements); // Pass the modified response downstream
                    observer.complete(); // Complete the Observable
                });
            })
        ).subscribe(
            (response: any) => {
                // Handle the response or perform subsequent operations if needed
                this.elementsRetrieved.emit(response);
            },
            (error) => {
                console.error('Error:', error);
                // Handle errors
            }
        );
    }
}