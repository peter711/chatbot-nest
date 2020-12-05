import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessengerService } from './messenger.service';

describe('MessengerService', () => {
  let service: MessengerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), HttpModule],
      providers: [MessengerService],
    }).compile();

    service = module.get<MessengerService>(MessengerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
