import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './service/data.service';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
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
    expect(req.request.body).toEqual(testData);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush({}); // Simulate an empty response
  });

  // Add more tests for error handling, different scenarios, etc.
});
