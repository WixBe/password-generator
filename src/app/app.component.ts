import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'password-generator';

  upcase: boolean = false;
  lowcase: boolean = false;
  numbers: boolean = false;
  symbols: boolean = false;
  length: number = 15;
  passwordStrength: number = 0;
  password: string = '';

  checkboxes = [
    {id: 'upcase', label: 'Include Uppercase Letters', checked: false},
    {id: 'lowcase', label: 'Include Lowercase Letters', checked: false},
    {id: 'numbers', label: 'Include Numbers', checked: false},
    {id: 'symbols', label: 'Include Symbols', checked: false}
  ];

  activeCheckboxCount() : number {
    return this.checkboxes.filter(checkbox => checkbox.checked).length;
  }

  onCheckboxChange() : void {
    this.calculateStrength();
    console.log('Active checkboxes: ', this.activeCheckboxCount)
  }

  onSliderMove(event: Event): void {

    const input = event.target as HTMLInputElement;
    this.length = Number(input.value);
    this.calculateStrength();
    console.log('strenght updated')
  }

  calculateStrength() {
    this.passwordStrength = 0;
    if (this.upcase) this.passwordStrength++;
    if (this.lowcase) this.passwordStrength++;
    if (this.numbers) this.passwordStrength++;
    if (this.symbols) this.passwordStrength++;
  }
  generatePassword() {
  
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charSet = '';
    if (this.upcase) charSet+= uppercaseChars;
    if (this.lowcase) charSet+= lowercaseChars;
    if (this.numbers) charSet+= numberChars;
    if (this.symbols) charSet+= symbolChars;

    this.password = Array.from({ length: this.length })
    .map(() => charSet.charAt(Math.floor(Math.random() * charSet.length)))
    .join('');
    this.calculateStrength();
  }
}
