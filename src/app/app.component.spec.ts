import { ComponentFixture,TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './service/data.service';
import {FullScreenIframeComponent} from './full-screen-iframe/full-screen-iframe.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';


AboutComponent
//import * as path from './app.component'; // assuming checkHTML is exported from check-html.ts
/****************************/
function checkHTMLStructure(htmlContent: string): string[] {
  const stack: string[] = [];
  const errors: string[] = [];

  const doc = new DOMParser().parseFromString(htmlContent, 'text/html');
  const nodes = doc.body.childNodes;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;

      if (element.tagName.toLowerCase() !== 'br') {
        if (element.tagName.toLowerCase() !== 'img') {
          if (element.childNodes.length > 0) {
            stack.push(element.tagName.toLowerCase());
          } else {
            errors.push(`Element <${element.tagName.toLowerCase()}> opened but not closed.`);
          }
        }
      }

      for (let j = 0; j < element.children.length; j++) {
        const child = element.children[j] as Element;
        stack.push(child.tagName.toLowerCase());
      }
    }
  }

  while (stack.length > 0) {
    const unclosed = stack.pop();
    errors.push(`Additional <${unclosed}> without closing.`);
  }

  return errors;
}

/****************************/

let htmlString: any = '';


// Inside your Angular component test file (e.g., app.component.spec.ts)
describe('AppComponent', () => {
  it('should validate HTML structure', () => {
    //const htmlString = service.getData(@'C:\Users\yaniv\OneDrive\Documents\Angular\Victim07102023War\Victims07102023War\src\app\app.component.html');
    
    alert('im here')
    const structureErrors = checkHTMLStructure(htmlString);
    expect(structureErrors.length).toBe(0); // Assert no structure errors
  });
});

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
      
    });
    htmlString = service.getData("file://app.component.html")
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request with the correct body and headers', () => {

    const urlvalue:string  = 'https://www.haaretz.co.il/news/2023-10-12/ty-article-magazine/0000018b-1367-dcc2-a99b-17779a0a0000';
    const classorid:string = '.war-victims-layout-container';  
    const testData ={
      url:urlvalue,
      classorid:classorid
    };

    const  apiUrl = 'https://yqsmgmgbyj.execute-api.us-west-1.amazonaws.com/default/WebScraberService'; // Replace with your API URL
    service.postRequest(testData).subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    //expect(req.request.body).toEqual(testData);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush({}); // Simulate an empty response
  });

  // Add more tests for error handling, different scenarios, etc.
});
