// const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  let result = [];
    if (Array.isArray(arr) === false) {
      throw new Error("'arr' parameter must be an instance of the Array!");
    }
    for (let i = 0; i < arr.length; i = i) {
      if (arr[i] === '--double-next') {
        if (i === arr.length - 1) {
            i++;
        } else {
            result.push(arr[i+1]);
            i++;
        }
      } else if (arr[i] === '--double-prev') {
        if (i === 0) {
            i++;
        } else {
            result.push(arr[i-1]);
            i++;
        }
      } else if (arr[i] === '--discard-prev') {
        if (i === 0) {
            i++;
        } else {
            result.pop();
            i++;
        }
      } else if (arr[i] === '--discard-next') {
        if (arr[i+2] === '--double-prev' || arr[i+2] === '--discard-prev') {
          i += 3
        } else {
        i += 2;}
      } else {
        result.push(arr[i]);
        i++;
      }
    }
    return result.filter(el => Number.isNaN(el) === false);
}

module.exports = {
  transform
};
