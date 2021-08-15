import { JSDOM } from 'jsdom';
import fetch from 'node-fetch';

export async function fetchLink(id: number): Promise<string> {
  const res = await fetch('https://xkcd.com/'.concat(id.toString()));
  const text = await res.text();
  const dom = new JSDOM(text);
  return [...dom.window.document.getElementsByTagName('a')]
    .map((i) => i.href)
    .filter((i) => i.startsWith('https://imgs.xkcd.com/comics/'))
    .pop();
}
