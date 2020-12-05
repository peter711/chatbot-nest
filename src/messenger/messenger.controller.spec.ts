import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessengerController } from './messenger.controller';
import { MessengerService } from './messenger.service';

describe('MessengerController', () => {
  let controller: MessengerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      controllers: [MessengerController],
      providers: [MessengerService],
    }).compile();

    controller = module.get<MessengerController>(MessengerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
