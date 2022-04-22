const isEmpty = require('lodash/isEmpty');
const isPrimitive = require('./helpers/isPrimitive');
const hasPrototype = require('./helpers/hasPrototype');

function deepToFlatObject(originalObj, options = {}) {
  const preservePrototypes = options.preservePrototypes ?? true;
  const pathPrefix = options.pathPrefix ?? '';

  const fullPathObj = {};

  function depthFirstObjTraversal(obj, path = '') {
    if (!isEmpty(obj)) {
      Object.keys(obj).forEach((key) => {
        if (obj[key] && typeof obj[key] === 'object' && !isEmpty(obj[key]) && !(preservePrototypes && hasPrototype(obj[key])) && !(obj[key] instanceof Date)) {
          const deepPath = path ? `${path}.${key}` : key;
          depthFirstObjTraversal(obj[key], deepPath);
        } else if (isPrimitive(obj[key])
        || obj[key] instanceof Date
        || (preservePrototypes && hasPrototype(obj[key]))) {
          fullPathObj[path ? `${path}.${key}` : key] = obj[key];
        }
      });
    }
  }

  depthFirstObjTraversal(originalObj, pathPrefix);

  return fullPathObj;
}

module.exports = deepToFlatObject;
