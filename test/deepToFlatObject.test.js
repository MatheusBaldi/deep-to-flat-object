/* global it describe */
const chai = require('chai');
const mongoose = require('mongoose');
const deepToFlatObject = require('../deepToFlatObject');

const { expect } = chai;

describe('deepToFlatObject', () => {
  it('should transform a deep object into a shallow object where all values are referenced through a string path based on the original deep object structure', () => {
    const objectId = mongoose.Types.ObjectId();
    const objectId2 = mongoose.Types.ObjectId();
    const date = new Date();

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

    const expectedShallowObject = {
      'a.b.f.0.g': objectId,
      'a.b.f.0.i': 10,
      'a.b.f.1.h': date,
      'a.b.j.0': objectId2,
      'a.c': 1,
      'a.d': '',
    };

    const shallowObjectResult = deepToFlatObject(deepObject);

    expect(shallowObjectResult['a.b.f.0.g'] instanceof mongoose.Types.ObjectId).to.be.eq(true);
    expect(String(shallowObjectResult['a.b.f.0.g'])).to.be.eq(String(expectedShallowObject['a.b.f.0.g']));
    expect(shallowObjectResult['a.b.f.0.i']).to.be.eq(expectedShallowObject['a.b.f.0.i']);
    expect(shallowObjectResult['a.b.f.1.h']).to.be.eq(expectedShallowObject['a.b.f.1.h']);
    expect(shallowObjectResult['a.c']).to.be.eq(expectedShallowObject['a.c']);
    expect(shallowObjectResult['a.d']).to.be.eq(expectedShallowObject['a.d']);
    expect(shallowObjectResult).to.have.all.keys([
      'a.b.f.0.g',
      'a.b.f.0.i',
      'a.b.f.1.h',
      'a.b.j.0',
      'a.c',
      'a.d',
    ]);
  });

  it('should transform a deep object into a shallow object where all values are referenced through a string path based on the original deep object structure with a path prefix', () => {
    const objectId = mongoose.Types.ObjectId();
    const objectId2 = mongoose.Types.ObjectId();
    const date = new Date();

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

    const pathPrefix = 'any.path.prefix';
    const addPrefix = (path) => `${pathPrefix}.${path}`;

    const expectedShallowObject = {
      [addPrefix('a.b.f.0.g')]: objectId,
      [addPrefix('a.b.f.0.i')]: 10,
      [addPrefix('a.b.f.1.h')]: date,
      [addPrefix('a.b.j.0')]: objectId2,
      [addPrefix('a.c')]: 1,
      [addPrefix('a.d')]: '',
    };
    const shallowObjectResult = deepToFlatObject(deepObject, { pathPrefix });

    expect(shallowObjectResult[addPrefix('a.b.f.0.g')] instanceof mongoose.Types.ObjectId).to.be.eq(true);
    expect(String(shallowObjectResult[addPrefix('a.b.f.0.g')])).to.be.eq(String(expectedShallowObject[addPrefix('a.b.f.0.g')]));
    expect(shallowObjectResult[addPrefix('a.b.f.0.i')]).to.be.eq(expectedShallowObject[addPrefix('a.b.f.0.i')]);
    expect(shallowObjectResult[addPrefix('a.b.f.1.h')]).to.be.eq(expectedShallowObject[addPrefix('a.b.f.1.h')]);
    expect(shallowObjectResult[addPrefix('a.c')]).to.be.eq(expectedShallowObject[addPrefix('a.c')]);
    expect(shallowObjectResult[addPrefix('a.d')]).to.be.eq(expectedShallowObject[addPrefix('a.d')]);
    expect(shallowObjectResult).to.have.all.keys([
      addPrefix('a.b.f.0.g'),
      addPrefix('a.b.f.0.i'),
      addPrefix('a.b.f.1.h'),
      addPrefix('a.b.j.0'),
      addPrefix('a.c'),
      addPrefix('a.d'),
    ]);
  });
});
