import { expect } from 'chai';
import { fetchLink } from './xkcd';
import itParam from 'mocha-param';

describe('fetchLink', () => {
  itParam(
    'fetches the full xkcd comic url',
    [
      { id: 1, url: 'https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg' },
      { id: 2, url: 'https://imgs.xkcd.com/comics/tree_cropped_(1).jpg' },
      { id: 3, url: 'https://imgs.xkcd.com/comics/island_color.jpg' },
    ],
    async ({ id, url }) => {
      expect(await fetchLink(id)).to.equal(url);
    }
  );
});
