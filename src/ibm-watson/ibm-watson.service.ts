import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IamAuthenticator } from 'ibm-watson/auth';
import AssistantV2 from 'ibm-watson/assistant/v2';
@Injectable()
export class IbmWatsonService implements OnModuleInit {
  private assistant: AssistantV2;
  private readonly version = '2020-04-01';
  private sessionId: string;

  constructor(private config: ConfigService) {
    this.assistant = new AssistantV2({
      version: this.version,
      authenticator: new IamAuthenticator({
        apikey: this.getIbmWatsonApiKey(),
      }),
      serviceUrl: this.getIbmWatsonUrl(),
    });
  }
  async onModuleInit() {
    await this.createSession();
  }

  public async sendMessage(text: string) {
    try {
      const { status, result } = await this.assistant.message({
        assistantId: this.getIbmWatsonAssistantId(),
        sessionId: this.sessionId,
        input: {
          message_type: 'text',
          text,
        },
      });

      if (status == 200) {
        console.log(`IBM Watson message sent: ${result}`);
      }

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  private async createSession() {
    try {
      const { status, result } = await this.assistant.createSession({
        assistantId: this.getIbmWatsonAssistantId(),
      });
      if (status == 201) {
        this.sessionId = result.session_id;
        console.log('Established session with IBM Watson Assistant');
      }
    } catch (err) {
      console.log(err);
    }
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
