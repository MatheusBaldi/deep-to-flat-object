# deep-to-flat-object
Transforms a deep object into a flat object, assigning each value to a field named by its full path in the deep object.

- Array indexes are considered field names;
- It is possíble to determine a prefix to all field names through the `options.pathPrefix`;
- By default, if the field value is an object with a prototype, it is considered a final value and the recursion stops, preserving the prototype. It is possible to disable this behaviour by setting `options.preservePrototype` to `false`. In the example below, the `ObjectId` objects have their prototype preserved;

## Example:
#### Input
```js
    const objectId = mongoose.Types.ObjectId(); // ObjectId('626311d15dd8ead6df31db77')
    const objectId2 = mongoose.Types.ObjectId(); // ObjectId('626311d95dd8ead6df31db78')
    const date = new Date(); // 2022-04-22T20:37:54.496Z

    const deepObject = {
      a: {
        b: {
          f: [
            {
              g: objectId,
              i: 10,
            },
            {
              h: date,
            },
          ],
          j: [objectId2],
        },
        c: 1,
        d: '',
      },
    };
```

#### Output
```js
    const flatObject = deepToFlatObject(deepObject);
    /**
    {
      'a.b.f.0.g': objectId, // ObjectId('626311d15dd8ead6df31db77')
      'a.b.f.0.i': 10,
      'a.b.f.1.h': date, // 2022-04-22T20:37:54.496Z
      'a.b.j.0': objectId2, // ObjectId('626311d95dd8ead6df31db78')
      'a.c': 1,
      'a.d': '',
    };
    */
```
