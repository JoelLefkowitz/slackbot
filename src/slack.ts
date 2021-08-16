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

  get formBoundary(): string {
    return `------WebKitFormBoundary${this.boundaryKey}`;
  }

  get headers(): Record<string, string> {
    return {
      accept: '*/*',
      cookie: this.cookie,
      pragma: 'no-cache',
      'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
      'cache-control': 'no-cache',
      'content-type': 'multipart/form-data; boundary='.concat(
        this.formBoundary.replace('------', '----')
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
      `Content-Disposition: form-data; name="${key}"`,
      '\r\n',
      '\r\n',
      value,
      '\r\n',
    ].join('');

  encodeForm = (data: Record<string, string>): string =>
    Object.entries(data)
      .map(([key, value]) => this.encodeField(key, value))
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

    return this.encodeForm({
      channel: channel,
      ts: '1629056093.xxxxx2',
      type: 'message',
      xArgs: '{}',
      blocks: message,
      include_channel_perm_error: 'true',
      client_msg_id: uuidv4(),
      token: this.token,
      _x_reason: 'webapp_message_send',
      _x_mode: 'online',
      _x_sonic: 'true',
    });
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

    const body = await res.text();
    
    if (body["ok"]) {      
      console.log(`Sent ${text} to ${name}.`)
    }
    
    else{      
      console.error(body);
    }
  }
}
