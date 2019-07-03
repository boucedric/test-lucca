import {NgModule} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';




@NgModule({
  imports: [
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  exports: [
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule
  ]
})

export class MaterialModule {}
