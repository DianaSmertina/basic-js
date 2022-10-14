const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let addArray = [];
  let addStr;
  let mainArr = [];
  let mainStr;
  if (options.addition !== undefined) {
    if (options.additionRepeatTimes > 0) {
      for (let i = 1; i <= options.additionRepeatTimes; i++) {
        addArray.push(String(options.addition));
      }
    } else {addArray[0] = String(options.addition)};

    if (options.additionSeparator !== undefined) {
      addStr = addArray.join(options.additionSeparator);
    } else {addStr = addArray.join('|')}
  }


  if (options.repeatTimes > 0) {
    if (addArray.length > 0) {
      str += addStr;
    }
    for (let i = 1; i <= options.repeatTimes; i++) {
      mainArr.push(str);
    }
    if (options.separator !== undefined) {
      mainStr = mainArr.join(options.separator);
    } else {mainStr = mainArr.join('+')}

  } else {
    if (addStr !== undefined) {
      return str+addStr;
    } else {return str};
  }
  return mainStr;
}

module.exports = {
  repeater
};
