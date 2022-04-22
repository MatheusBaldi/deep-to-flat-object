function hasPrototype(object) {
  return !!Object.keys(Object.getPrototypeOf(object)).length;
}

module.exports = hasPrototype;
