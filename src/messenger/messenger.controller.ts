import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import IWebhookBodyRequest from './dto/IWebhookBodyRequest';
import { MessengerService } from './messenger.service';

@Controller('messenger')
export class MessengerController {
  constructor(private messengerService: MessengerService) {}

  @Get('/webhook')
  public async verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    try {
      await this.messengerService.verifyWebhook(mode, token);
      console.log('WEBHOOK_VERIFIED');
      res.status(HttpStatus.OK).send(challenge);
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.FORBIDDEN).send();
    }
  }

  @Post('/webhook')
  public handleWebhookMessage(
    @Body() { entry, object }: IWebhookBodyRequest,
    @Res() res: Response,
  ) {
    if (object === 'page') {
      entry.forEach((e) => {
        const webhookEvent = e.messaging[0];
        console.log(webhookEvent);

        const senderPSID = webhookEvent.sender.id;
        console.log(`Sender PSID: ${senderPSID}`);

        if (webhookEvent.message) {
          this.messengerService.handleMessage(senderPSID, webhookEvent.message);
        }

        res.status(200).send('EVENT_RECEIVED');
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }
  }
}
