import * as fs from 'fs';

import { CronJob } from 'cron';
import { SlackClient } from './slack';
import { daysSinceEpoch } from './utils';
import { fetchLink } from './xkcd';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

export const botStart = 18854;
export const memeOffset = 1600;

export type Credentials = {
  boundaryKey: string;
  channels: Record<string, string>;
  cookie: string;
  token: string;
  url: string;
};

export async function main(credentials: Credentials): Promise<void> {
  const { token, url, cookie, boundaryKey, channels } = credentials;
  const client = new SlackClient(token, url, cookie, boundaryKey);

  const text = await fetchLink(daysSinceEpoch() - botStart + memeOffset);
  client.sendMessage('joel', channels.joel, text);

  const cron = new CronJob('0 9 * * *', async () => {
    const text = await fetchLink(daysSinceEpoch() - botStart + memeOffset);
    Object.entries(channels).map(([name, id]) =>
      client.sendMessage(name, id, text)
    );
  });

  cron.start();
}

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 --path [str]')
  .default('path', 'credentials.json').argv;

const credentials = JSON.parse(fs.readFileSync(argv['path']).toString());
main(credentials);
