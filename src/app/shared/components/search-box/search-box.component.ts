import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private deboucerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();


  ngOnInit(): void {
    this.deboucerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
      )
      .subscribe( value => {
        this.onDebounce.emit( value );
    })
  }


  ngOnDestroy(): void {
    this.deboucerSuscription?.unsubscribe();
  }


  emitValue(busqueda: string) {
    this.onValue.emit(busqueda);
  }

  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }
}
