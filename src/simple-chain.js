const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  chainArr: [],

  getLength() {
    return this.chainArr.length;
  },
  addLink(value) {
    if (value === undefined) {
      this.chainArr.push('( )');
    } else if (value === null) {
      this.chainArr.push('null');
    } else {
      this.chainArr.push(value);
    }
   return this;    
  },
  removeLink(position) {
    if (position > this.chainArr.length || position <= 0 || typeof position !== 'number' || Number.isInteger(position) === false ) {
      this.chainArr = [];
      throw new Error("You can't remove incorrect link!");
    } else {
      this.chainArr.splice(position - 1, 1);
      return this;
    }
  },
  reverseChain() {
    this.chainArr.reverse();
    return this;
  },
  finishChain() {
    const result = this.chainArr;
    this.chainArr = [];
    return "( " + result.join(" )~~( ") + " )" ;
  }
};

module.exports = {
  chainMaker
};
