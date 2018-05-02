import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<tick-tock flex></tick-tock><identity-bar title="Hoggy"></identity-bar>`
})
export class AppComponent {
  public header: string = 'UMD Demo';
}
