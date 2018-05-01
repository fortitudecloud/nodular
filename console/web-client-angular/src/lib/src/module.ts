import { NgModule } from '@angular/core';

import { LibComponent } from './component/lib.component';
import { LibService } from './service/lib.service';

import { ConsoleService } from './service/console.service';

@NgModule({
  declarations: [LibComponent],
  providers: [LibService],
  exports: [LibComponent]
})
export class LibModule { }

@NgModule({
    declarations: [LibComponent],
    providers: [ConsoleService],
    exports: [LibComponent]
})
export class ConsoleModule { }
