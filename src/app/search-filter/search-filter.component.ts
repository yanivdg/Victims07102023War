import { Component,OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent implements OnInit {
  @Output() filter = new EventEmitter<any>();
  constractor(){}
  
  ngOnInit(): void
  {

  }
  listFilter : any = '0';
 changeFilter(value:any){
    this.filter.emit();
  }
}
