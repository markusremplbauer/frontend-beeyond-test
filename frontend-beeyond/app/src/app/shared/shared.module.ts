import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ApplicationPreviewComponent } from './components/application-preview/application-preview.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TemplateListComponent, PageNotFoundComponent, ApplicationPreviewComponent],
    exports: [TemplateListComponent, ApplicationPreviewComponent],
  imports: [CommonModule, MatListModule, MatRippleModule, MatIconModule, MonacoEditorModule, FormsModule]
})
export class SharedModule {}
