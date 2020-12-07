import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IamAuthenticator } from 'ibm-watson/auth';

const AssistantV2 = require('ibm-watson/assistant/v2');

@Injectable()
export class IbmWatsonService implements OnModuleInit {
  private assistant: typeof AssistantV2;
  private readonly version = '2020-04-01';

  constructor(private config: ConfigService) {
    this.assistant = new AssistantV2({
      version: this.version,
      authenticator: new IamAuthenticator({
        apikey: this.getIbmWatsonApiKey(),
      }),
      serviceUrl: this.getIbmWatsonUrl(),
    });
  }
  onModuleInit() {
    this.createSession();
  }

  private createSession() {
    this.assistant
      .createSession({
        assistantId: this.getIbmWatsonAssistantId(),
      })
      .then((res) => {
        console.log(JSON.stringify(res.result, null, 2));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  private getIbmWatsonApiKey() {
    return this.config.get('WATSON_API_KEY');
  }

  private getIbmWatsonUrl() {
    return this.config.get('WATSON_API_URL');
  }

  private getIbmWatsonAssistantId() {
    return this.config.get('WATSON_ASSISTANT_ID');
  }
}
