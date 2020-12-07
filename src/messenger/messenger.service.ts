import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IbmWatsonService } from 'src/ibm-watson/ibm-watson.service';
import IWebhookAPIRequestBody from './dto/IWebhookAPIRequestBody';
import IWebhookMessage from './dto/IWebhookMessage';
import IWebhookResponse from './dto/IWebhookResponse';

@Injectable()
export class MessengerService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private ibmWatsonService: IbmWatsonService,
  ) {}

  public async verifyWebhook(mode: string, token: string) {
    return new Promise<void>((resolve, reject) => {
      const verifyToken = this.getVerifyToken();
      if (mode && token) {
        if (mode === 'subscribe' && token === verifyToken) {
          resolve();
        }
      }
      reject('WRONG TOKEN');
    });
  }

  public async handleMessage(senderPSID: string, { text }: IWebhookMessage) {
    if (text) {
      const {
        output: {
          generic: [{ text: watsonText }],
        },
      } = await this.ibmWatsonService.sendMessage(text);

      const response: IWebhookResponse = {
        text: watsonText,
      };

      this.callSendAPI(senderPSID, response);
    }
  }

  private callSendAPI(senderPSID: string, response: IWebhookResponse) {
    const requestBody: IWebhookAPIRequestBody = {
      recipient: {
        id: senderPSID,
      },
      message: response,
    };

    const facebookGraphUri = this.getFacebookGraphAPIUri();
    const pageAccessToken = this.getPageAccessToken();

    try {
      this.httpService
        .post(facebookGraphUri, requestBody, {
          params: {
            access_token: pageAccessToken,
          },
        })
        .subscribe(({ status, statusText }) => {
          if (status === 200) {
            console.log('Message sent to facebook API');
          } else {
            console.log(`${status}: ${statusText}`);
          }
        });
    } catch (err) {
      console.log(`Unable to send message: ${err}`);
    }
  }

  private getVerifyToken() {
    return this.configService.get('MESSENGER_VERIFY_TOKEN');
  }

  private getFacebookGraphAPIUri() {
    return this.configService.get('FACEBOOK_GRAPH_URI');
  }

  private getPageAccessToken() {
    return this.configService.get('PAGE_ACCESS_TOKEN');
  }
}
