import { NgModule } from '@angular/core';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
    declarations: [],
    imports: [
        PanelModule,
        CardModule,
        DropdownModule
    ],
    exports:[PanelModule, CardModule,DropdownModule],
    providers: []
  })
  export class SharedModule { }