import { NgModule } from '@angular/core';

import { LibComponent } from './component/lib.component';
import { LibService } from './service/lib.service';

import { IdentityBarComponent } from './component/identity-bar/identity-bar.component';
import { ConsoleService } from './service/console.service';

@NgModule({
  declarations: [LibComponent],
  providers: [LibService],
  exports: [LibComponent]
})
export class LibModule { }

@NgModule({
    declarations: [LibComponent,IdentityBarComponent],
    providers: [ConsoleService],
    exports: [LibComponent, IdentityBarComponent]
})
export class ConsoleModule { }
