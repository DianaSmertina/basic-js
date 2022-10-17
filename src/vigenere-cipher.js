const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(reverse) {
    this.reverse = reverse;
}
encrypt(message, key) {
  if (arguments.length < 2 || arguments[0] === undefined || arguments[1] === undefined) {
    throw new Error('Incorrect arguments!');
  }
  let messageArrWithAnotherSim = message.toUpperCase().split('');
  let obj = {};
  for (let i = 0; i < messageArrWithAnotherSim.length; i++) {
    if (messageArrWithAnotherSim[i].charCodeAt() < 65 || messageArrWithAnotherSim[i].charCodeAt() > 90) {
        obj[i] = messageArrWithAnotherSim[i];
    }
  }
  let messageArray = message.toUpperCase().split('').filter(el => el.charCodeAt() >= 65 && el.charCodeAt() <= 90);
  let keyArray = key.toUpperCase().split('');
  
  const lengthDiff = messageArray.length-keyArray.length;
  const keyArrayLength = keyArray.length;
  if (keyArray.length < messageArray.length) {
    for (let i = 0; i < lengthDiff; i++){
        keyArray[keyArrayLength+i] = keyArray[i];
    }
  }
  let secret = messageArray.map((el,i) => {
    let numOfSec = ((el.charCodeAt() - 65) + (keyArray[i].charCodeAt() - 65)) % 26;
    return String.fromCharCode(numOfSec + 65);
  })
  
  let result = messageArrWithAnotherSim.map((el, i) => {
    
    if (obj.hasOwnProperty(i) === true) {
        return obj[i];
    } else {
        let help = secret[0];
        secret.shift();
        return help;
    }
  });
  
  if (this.reverse === false) {
    return result.reverse().join('');
  }
  return result.join('');
}


decrypt(encryptedMessage, key) {
  if (arguments.length < 2 || arguments[0] === undefined || arguments[1] === undefined) {
    throw new Error('Incorrect arguments!');
  }
  let messageArrWithAnotherSim = encryptedMessage.toUpperCase().split('');
  let obj = {};
  for (let i = 0; i < messageArrWithAnotherSim.length; i++) {
    if (messageArrWithAnotherSim[i].charCodeAt() < 65 || messageArrWithAnotherSim[i].charCodeAt() > 90) {
        obj[i] = messageArrWithAnotherSim[i];
    }
  }
  let messageArray = encryptedMessage.toUpperCase().split('').filter(el => el.charCodeAt() >= 65 && el.charCodeAt() <= 90);
  let keyArray = key.toUpperCase().split('');
  
  const lengthDiff = messageArray.length-keyArray.length;
  const keyArrayLength = keyArray.length;
  if (keyArray.length < messageArray.length) {
    for (let i = 0; i < lengthDiff; i++){
        keyArray[keyArrayLength+i] = keyArray[i];
    }
  }
  let secret = messageArray.map((el,i) => {
    let numOfSec = ((el.charCodeAt() - 65) - (keyArray[i].charCodeAt() - 65)) % 26;
    if(numOfSec > 0) {
        return String.fromCharCode(numOfSec + 65);
    } else {
        return String.fromCharCode((numOfSec + 26) % 26 + 65);
    }
    
  })
  
  let result = messageArrWithAnotherSim.map((el, i) => {
    
    if (obj.hasOwnProperty(i) === true) {
        return obj[i];
    } else {
        let help = secret[0];
        secret.shift();
        return help;
    }
  });
  
  if (this.reverse === false) {
    return result.reverse().join('');
  }
  return result.join('');
}
}




module.exports = {
  VigenereCipheringMachine
};
