import { Component, OnInit } from '@angular/core';
import {DataService} from './service/data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  //standalone: true
})
export class AppComponent implements OnInit{
  title = 'my-app';
   result: any;
   data:string[][]=[];
  constructor(private dataService: DataService) { }
  //constructor(private http:HttpClient){}
  isLoading: boolean = false; // Initially set to false
 ngOnInit(): void {}
 myFunction():void
  {
    this.isLoading = true;
    const urlvalue:string  = 'https://www.haaretz.co.il/news/2023-10-12/ty-article-magazine/0000018b-1367-dcc2-a99b-17779a0a0000';
    const classorid:string = '.war-victims-layout-container';  
    const jsonbody ={
      url:urlvalue,
      classorid:classorid
    };

    this.dataService.postRequest(jsonbody)
    .subscribe(      
      (response:any) => {
      //this.result = response;
      const body = response.body;
      const datajson = JSON.parse(body);
      // Split the data into records
      const records = datajson.data.split('\n');

      // Split each record into fields
      this.data = records.map((record:string) => record.split(',').filter(field => field.trim() !== ''));
      //const rows = datajson.data.split('//n');
      //this.data = rows.map((row: string) => row.split(','));
      console.log(this.result);
      this.isLoading = false;
    },
    (error) => {
      console.error(error);
    }
  );
    }
}
