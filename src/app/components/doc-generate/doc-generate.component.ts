import { Component } from '@angular/core';
import { DocGenerateService } from 'src/app/services/doc-generate.service';

@Component({
  selector: 'app-doc-generate',
  templateUrl: './doc-generate.component.html',
  styleUrls: ['./doc-generate.component.css']
})
export class DocGenerateComponent {

  userInput: string = '';
  generatedText: string = '';

  constructor(private docGenerateService: DocGenerateService) {}

  generateText() {
    if (this.userInput.trim() !== '') {
      this.docGenerateService.generateText(this.userInput).subscribe(
        (response: any) => {
          console.log(response);
          this.generatedText = response.generatedText;
          console.log(this.generatedText)
        },
        (error: any) => {
          console.error('Erro ao chamar a API de geração de texto:', error);
        }
      );
    }
  }

}
