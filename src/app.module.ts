import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessengerModule } from './messenger/messenger.module';
import { IbmWatsonModule } from './ibm-watson/ibm-watson.module';

@Module({
  imports: [MessengerModule, IbmWatsonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
