const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 * 
 * @example
 * 
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */

//  let deep = 1;
//  let result = 1;
 class DepthCalculator {

  calculateDepth(arr) {
      if (!Array.isArray(arr) || arr.length === 0){
        return 1
      }
      const nestedArr = arr.filter(el => (Array.isArray(el) === true));
      if (nestedArr.length === 0){
        return 1;
      }
      return Math.max(...nestedArr
        .map(el=>(this.calculateDepth(el)))) + 1;
    
  }
  
}

module.exports = {
  DepthCalculator
};
