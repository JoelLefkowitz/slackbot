import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

export class SlackClient {
  token: string;
  url: string;
  cookie: string;
  boundaryKey: string;

  constructor(token: string, url: string, cookie: string, boundaryKey: string) {
    this.token = token;
    this.url = url;
    this.cookie = cookie;
    this.boundaryKey = boundaryKey;
  }

  get formBoundary() {
    return `------WebKitFormBoundary${this.boundaryKey}`;
  }

  get headers() {
    return {
      accept: '*/*',
      cookie: this.cookie,
      pragma: 'no-cache',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'multipart/form-data; boundary='.concat(
        this.formBoundary
      ),
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua':
        '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
    };
  }

  encodeField = (key: string, value: string): string =>
    [
      this.formBoundary,
      '\r\n',
      `Content-Disposition: form-data; name=${key}`,
      '\r\n',
      '\r\n',
      value,
      '\r\n',
    ].join('');

  encodeForm = (data: { key: string; value: string }[]): string =>
    data
      .map(({ key, value }) => this.encodeField(key, value))
      .join('')
      .concat(this.formBoundary, '--', '\r\n');

  makeMessage = (channel: string, text: string): string => {
    const message = JSON.stringify([
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [{ type: 'text', text }],
          },
        ],
      },
    ]);

    return this.encodeForm([
      { key: 'channel', value: channel },
      { key: 'ts', value: '1629056093.xxxxx2' },
      { key: 'type', value: 'message' },
      { key: 'xArgs', value: '{}' },
      { key: 'blocks', value: message },
      { key: 'include_channel_perm_error', value: 'true' },
      { key: 'client_msg_id', value: uuidv4() },
      { key: 'token', value: this.token },
      { key: '_x_reason', value: 'webapp_message_send' },
      { key: '_x_mode', value: 'online' },
      { key: '_x_sonic', value: 'true' },
    ]);
  };

  async sendMessage(
    name: string,
    channel: string,
    text: string
  ): Promise<void> {
    const res = await fetch(this.url, {
      mode: 'cors',
      method: 'POST',
      referrerPolicy: 'no-referrer',
      headers: this.headers,
      body: this.makeMessage(channel, text),
    });
  }
}
