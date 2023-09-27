import { NgModule } from '@angular/core';

import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
    exports: [
        jqxGridModule
    ]
})
export class JQWidgetsModule { }
