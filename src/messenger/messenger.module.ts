import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessengerController } from './messenger.controller';
import { MessengerService } from './messenger.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [MessengerController],
  providers: [MessengerService],
})
export class MessengerModule {}
