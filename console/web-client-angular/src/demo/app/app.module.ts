import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { LibModule } from 'quickstart-lib';
//import { ConsoleModule } from 'web-client-angular';
import { ConsoleModule } from '../../lib/index';

import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule, ConsoleModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
