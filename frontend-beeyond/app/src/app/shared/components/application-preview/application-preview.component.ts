import { Component, Inject, Input, OnInit } from '@angular/core';
import { ApplicationRange } from '../../models/application-range.model';
import { ThemeService } from '../../../core/services/theme.service';

declare let monaco: any;

@Component({
  selector: 'app-application-preview',
  templateUrl: './application-preview.component.html',
  styleUrls: ['./application-preview.component.scss']
})
export class ApplicationPreviewComponent {


  @Input() data: {
    content: string;
    ranges: ApplicationRange[];
  };

  monacoEditorOptions = {
    language: 'yaml',
    scrollBeyondLastLine: false,
    readOnly: true,
    theme: this.themeService.isDarkTheme.value ? 'vs-dark' : 'vs-light',
    automaticLayout: true
  };

  constructor(
    private themeService: ThemeService
  ) {
    this.themeService.isDarkTheme.subscribe(value => {
      this.monacoEditorOptions = {
        ...this.monacoEditorOptions,
        theme: value ? 'vs-dark' : 'vs-light'
      };
    });
  }

  onEditorInit(editor: any) {
    const decorations = this.data.ranges.map(applicationRange => ({
      range: new monaco.Range(
        applicationRange.lineNumber,
        applicationRange.startColumn,
        applicationRange.lineNumber,
        applicationRange.endColumn
      ),
      options: {
        linesDecorationsClassName: 'monaco-application-line-decoration',
        inlineClassName: 'monaco-application-inline',
        hoverMessage: {
          value:
            '```yaml\n' +
            `   wildcard: ${applicationRange.wildcard}\n` +
            `      label: ${applicationRange.label}\n` +
            `description: ${applicationRange.description}` +
            '\n```'
        }
      }
    }));

    editor.deltaDecorations([], decorations);
  }
}
