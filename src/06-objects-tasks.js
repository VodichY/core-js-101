/* ************************************************************************************************
 *                                                                                                *
 * Plese read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectagle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  return {
    width,
    height,
    getArea() {
      return this.width * this.height;
    },
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  return Object.assign(Object.create(proto), JSON.parse(json));
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurences
 *
 * All types of selectors can be combined using the combinators ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string repsentation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */


function selectorBase(val, builder) {
  this.value = val;
  if (builder instanceof selectorBase) {
    this.prevValue = builder.stringify();
  } else {
    this.prevValue = '';
  }
}
function ElementSelector(val, builder) {
  this.value = val;
  if (builder instanceof selectorBase) {
    this.prevValue = builder.stringify();
  } else {
    this.prevValue = '';
  }
}
function IdSelector(val, builder) {
  this.value = val;
  if (builder instanceof selectorBase) {
    this.prevValue = builder.stringify();
  } else {
    this.prevValue = '';
  }
}

function ClassSelector(val, builder) {
  this.value = val;
  if (builder instanceof selectorBase) {
    this.prevValue = builder.stringify();
  } else {
    this.prevValue = '';
  }
}

function AttrSelector(val, builder) {
  this.value = val;
  if (builder instanceof selectorBase) {
    this.prevValue = builder.stringify();
  } else {
    this.prevValue = '';
  }
}
function PseudoClassSelector(val, builder) {
  this.value = val;
  if (builder instanceof selectorBase) {
    this.prevValue = builder.stringify();
  } else {
    this.prevValue = '';
  }
}
function PseudoElementSelector(val, builder) {
  this.value = val;
  if (builder instanceof selectorBase) {
    this.prevValue = builder.stringify();
  } else {
    this.prevValue = '';
  }
}
const cssSelectorBuilder = {
  element(value) {
    const selector = new ElementSelector(value, this);
    return selector;
  },

  id(value) {
    const selector = new IdSelector(value, this);
    return selector;
  },

  class(value) {
    const selector = new ClassSelector(value, this);
    return selector;
  },

  attr(value) {
    const selector = new AttrSelector(value, this);
    return selector;
  },

  pseudoClass(value) {
    const selector = new PseudoClassSelector(value, this);
    return selector;
  },

  pseudoElement(value) {
    const selector = new PseudoElementSelector(value, this);
    return selector;
  },

  combine(selector1, combinator, selector2) {
    return {
      stringify() {
        return `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
      },
    };
  },
};
function selectorsOrderError() {
  throw new Error(/Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element/);
}
function multipleSelectorsError() {
  throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
}
selectorBase.prototype = cssSelectorBuilder;
selectorBase.prototype.currentValueStr = function () {
  return `${this.value}`;
};
selectorBase.prototype.stringify = function () {
  return `${this.prevValue}${this.currentValueStr()}`;
};
ElementSelector.prototype = Object.create(selectorBase.prototype);
ElementSelector.prototype.element = multipleSelectorsError;
IdSelector.prototype = Object.create(selectorBase.prototype);
IdSelector.prototype.currentValueStr = function () {
  return `#${this.value}`;
};
IdSelector.prototype.id = multipleSelectorsError;
IdSelector.prototype.element = selectorsOrderError;
ClassSelector.prototype = Object.create(selectorBase.prototype);
ClassSelector.prototype.currentValueStr = function () {
  return `.${this.value}`;
};
ClassSelector.prototype.element = selectorsOrderError;
ClassSelector.prototype.id = selectorsOrderError;
AttrSelector.prototype = Object.create(selectorBase.prototype);
AttrSelector.prototype.currentValueStr = function () {
  return `[${this.value}]`;
};
AttrSelector.prototype.element = selectorsOrderError;
AttrSelector.prototype.id = selectorsOrderError;
AttrSelector.prototype.class = selectorsOrderError;
PseudoClassSelector.prototype = Object.create(selectorBase.prototype);
PseudoClassSelector.prototype.currentValueStr = function () {
  return `:${this.value}`;
};
PseudoClassSelector.prototype.element = selectorsOrderError;
PseudoClassSelector.prototype.id = selectorsOrderError;
PseudoClassSelector.prototype.class = selectorsOrderError;
PseudoClassSelector.prototype.attr = selectorsOrderError;
PseudoElementSelector.prototype = Object.create(selectorBase.prototype);
PseudoElementSelector.prototype.currentValueStr = function () {
  return `::${this.value}`;
};
PseudoElementSelector.prototype.pseudoElement = multipleSelectorsError;
PseudoElementSelector.prototype.element = selectorsOrderError;
PseudoElementSelector.prototype.id = selectorsOrderError;
PseudoElementSelector.prototype.class = selectorsOrderError;
PseudoElementSelector.prototype.attr = selectorsOrderError;
PseudoElementSelector.prototype.pseudoClass = selectorsOrderError;

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
