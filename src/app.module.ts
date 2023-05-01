import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RadarController } from './radar/radar.controller';
import { RadarService } from './radar/radar.service';

@Module({
  imports: [],
  controllers: [AppController, RadarController],
  providers: [AppService, RadarService],
})
export class AppModule {}
