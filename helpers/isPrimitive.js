function isPrimitive(value) {
  return Object(value) !== value;
}

module.exports = isPrimitive;
