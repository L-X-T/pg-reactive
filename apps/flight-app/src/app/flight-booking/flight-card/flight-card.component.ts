/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Flight } from '@flight-workspace/flight-lib';

@Component({
  selector: 'flight-card',
  templateUrl: './flight-card.component.html'
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() item: Flight | undefined;
  @Input() selected = false;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(private element: ElementRef, private zone: NgZone) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {}

  select(): void {
    this.selected = true;
    this.selectedChange.next(true);
  }

  deselect(): void {
    this.selected = false;
    this.selectedChange.next(false);
  }

  blink(): void {
    // Dirty Hack used to visualize the change detector
    // let originalColor = this.element.nativeElement.firstChild.style.backgroundColor;
    this.element.nativeElement.firstChild.style.backgroundColor = 'crimson';
    //              ^----- DOM-Element

    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.element.nativeElement.firstChild.style.backgroundColor = 'white';
      }, 1000);
    });
  }
}
