import { Component, ElementRef, ViewChild } from '@angular/core';
import { SpinnerService } from "./services/spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mini-shop-ui-ngrx';

  constructor(private spinnerService: SpinnerService) {
  }

  @ViewChild('spinner') set busyIndicator(elmRef: ElementRef) {
    if (elmRef.nativeElement) {
      this.spinnerService.elem = elmRef.nativeElement;
    }
  }
}
