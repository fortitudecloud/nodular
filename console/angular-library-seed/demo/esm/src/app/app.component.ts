import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<aero-user>    
  <div flex="row" grow>
      <div size="1"></div>
      <label size="1">Aero User</label>
  </div>    
</aero-user>`
    //templateUrl: './app.component.html'
})
export class AppComponent {
  public header: string = 'ESM Demo';
}
