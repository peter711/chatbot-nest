import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IbmWatsonService } from './ibm-watson.service';

@Module({
  imports: [ConfigModule.forRoot()],
  exports: [IbmWatsonService],
  providers: [IbmWatsonService],
})
export class IbmWatsonModule {}
