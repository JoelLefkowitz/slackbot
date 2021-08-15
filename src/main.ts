import { CronJob } from 'cron';
import { SlackClient } from './slack';
import { daysSinceEpoch } from './utils';
import { fetchLink } from './xkcd';

const botStart = 18854;
const memeOffset = 1600;

const token = '';
const url = '';
const cookie = '';
const boundaryKey = '';

const channels = [];

export async function main() {
  const client = new SlackClient(token, url, cookie, boundaryKey);

  const cron = new CronJob('* * * * *', async () => {
    const text = await fetchLink(daysSinceEpoch() - botStart + memeOffset);
    channels.map(({ name, id }) => client.sendMessage(name, id, text));
  });

  cron.start();
}

if (require.main === module) {
  main();
}
