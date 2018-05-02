import { NgModule } from '@angular/core';
import { TickTockComponent, IdentityBarComponent } from './components';
import { TickTockService } from './services';

@NgModule({
  providers: [
    TickTockService
  ],
  declarations: [
    TickTockComponent, IdentityBarComponent
  ],
  exports: [
    TickTockComponent, IdentityBarComponent
  ]
})
export class TickTockModule {
}
