import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessengerController } from './messenger.controller';
import { MessengerService } from './messenger.service';
import { IbmWatsonModule } from '../ibm-watson/ibm-watson.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, IbmWatsonModule],
  controllers: [MessengerController],
  providers: [MessengerService],
})
export class MessengerModule {}
