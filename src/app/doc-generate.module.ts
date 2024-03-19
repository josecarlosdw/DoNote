import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocGenerateComponent } from './components/doc-generate/doc-generate.component';
import { DocGenerateService } from './services/doc-generate.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DocGenerateComponent],
  imports: [CommonModule, FormsModule],
  providers: [DocGenerateService],
})
export class DocGenerateModule {}
