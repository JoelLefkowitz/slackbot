import { daysSinceEpoch, encodeParams } from './utils';

import { expect } from 'chai';
import sinon from 'sinon';

describe('daysSinceEpoch', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('returns 0 days on January 1, 1970.', () => {
    sinon
      .stub(Date, 'now')
      .returns(new Date('1970-01-01T00:00:00+00:00').getTime());

    expect(daysSinceEpoch()).to.equal(0);
  });

  it('returns 1 day on January 2, 1970.', () => {
    sinon
      .stub(Date, 'now')
      .returns(new Date('1970-01-02T00:00:00+00:00').getTime());

    expect(daysSinceEpoch()).to.equal(1);
  });

  it('returns 10957 days on January 1, 2000.', () => {
    sinon
      .stub(Date, 'now')
      .returns(new Date('2000-01-01T00:00:00+00:00').getTime());

    expect(daysSinceEpoch()).to.equal(10957);
  });
});

describe('encodeParams', () => {
  it('leaves an endpoint unchanged.', () => {
    const encoded = encodeParams('http://example.com');
    expect(encoded).to.equal('http://example.com');
  });

  it('encodes a key value pair.', () => {
    const encoded = encodeParams('http://example.com', { name: 'joel' });
    expect(encoded).to.equal('http://example.com?name=joel');
  });

  it('encodes multiple key value pairs.', () => {
    const encoded = encodeParams('http://example.com', {
      name: 'joel',
      zodiac: 'asparagus',
    });
    expect(encoded).to.equal('http://example.com?name=joel&zodiac=asparagus');
  });
});
