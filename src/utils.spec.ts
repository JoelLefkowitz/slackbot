import { encodeParams } from './utils';
import { expect } from 'chai';

describe('encodeParams', () => {
  it('leaves an endpoint unchanged', () => {
    const encoded = encodeParams('http://example.com');
    expect(encoded).to.equal('http://example.com');
  });

  it('encodes a key value pair', () => {
    const encoded = encodeParams('http://example.com', { name: 'joel' });
    expect(encoded).to.equal('http://example.com?name=joel');
  });

  it('encodes multiple key value pairs', () => {
    const encoded = encodeParams('http://example.com', {
      name: 'joel',
      zodiac: 'asparagus',
    });
    expect(encoded).to.equal('http://example.com?name=joel&zodiac=asparagus');
  });
});

describe('daysSinceEpoch', () => {
  it('', () => {
    // Date.now();
  });
});
