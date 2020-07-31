/* eslint-disable import/prefer-default-export */
export class GenerateRandomPassword {
  constructor(lowerCase, upperCase, symbols, numbers, length) {
    this.lowerCase = [lowerCase, 26, 97];
    this.upperCase = [upperCase, 26, 65];
    this.symbols = [symbols, 20, '!@#$%^&*(){}[]=<>/,.'];
    this.numbers = [numbers, 10, 48];
    this.length = length;
    this.count = 0;
    this.password = [];
    this.generateRndPassBasedOnFilters();
  }

  get getPassword() {
    return this.password.join('');
  }

  generateRndPassBasedOnFilters() {
    if (this.count >= this.length) {
      this.shuffleGeneratedPass();
      return;
    }

    if (this.upperCase[0]) {
      this.password.push(
        String.fromCharCode(
          Math.floor(Math.random() * this.upperCase[1] + this.upperCase[2])
        )
      );
    }

    if (this.lowerCase[0]) {
      this.password.push(
        String.fromCharCode(
          Math.floor(Math.random() * this.lowerCase[1] + this.lowerCase[2])
        )
      );
    }
    if (this.numbers[0]) {
      this.password.push(
        String.fromCharCode(
          Math.floor(Math.random() * this.numbers[1] + this.numbers[2])
        )
      );
    }
    if (this.symbols[0]) {
      this.password.push(
        this.symbols[2].charAt(Math.floor(Math.random() * this.symbols[1]))
      );
    }
    this.count++;
    this.generateRndPassBasedOnFilters();
  }

  shuffleGeneratedPass() {
    this.password = this.password.slice(0, this.length);
    let counter = this.password.length;
    while (counter > 0) {
      const rndIndex = Math.floor(Math.random() * counter);
      counter--;
      const temp = this.password[rndIndex];
      this.password[rndIndex] = this.password[counter];
      this.password[counter] = temp;
    }
  }
}
