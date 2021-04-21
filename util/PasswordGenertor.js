/* eslint-disable import/prefer-default-export */
export class GenerateRandomPassword {
  constructor(lowerCase, upperCase, symbols, numbers, length) {
    this.chars = {
      lowerCase: {
        include: lowerCase,
        fromRange: 26,
        toRange: 97
      },
      upperCase: {
        include: upperCase,
       
        fromRange: 26,
        toRange: 65
      },
      numbers: {
        include: numbers,
         fromRange: 10,
        toRange: 48
      },
      symbols: {
        include: symbols,
        fromRange: `!"#$%&()*<=>?@[\]^_{|}~`,
        toRange: `!"#$%&()*<=>?@[\]^_{|}~`.length
      }
    }
    this.activeChars = []
    this.count = 0;
    this.length = length
    this.password = [];
    this.includedChars()
    this.generatePass()


  }

  get getPassword() {
    return this.password.join('');
  }

  includedChars() {
    this.activeChars = Object.keys(this.chars).filter(char => this.chars[char].include)

  }

  randomChar(fromRange, toRange) {
    if(typeof fromRange === 'string'){
      this.password.push(fromRange.charAt(Math.random() * toRange))
    }else{

    this.password.push(String.fromCharCode(
      Math.floor(Math.random() * fromRange + toRange)))
    }
  }

  generatePass() {
   const trackChar = new Set()
    while (this.count !== this.length) {
      for (let [i, char] of this.activeChars.entries()) {
        if (this.activeChars.length === i + 1) {
          trackChar.clear()
        }
        if (!trackChar.has(char)) {
          trackChar.add(char)
          this.randomChar(this.chars[char].fromRange, this.chars[char].toRange)
          break
        }
      }
      this.count++;
    }

    this.shuffleGeneratedPass()
  }

  shuffleGeneratedPass() {
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

