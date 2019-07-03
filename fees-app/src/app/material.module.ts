import {NgModule} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';




@NgModule({
  imports: [
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule
  ]
})

export class MaterialModule {}
