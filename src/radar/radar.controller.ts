import { Body, Controller, Post } from '@nestjs/common';
import { VisionDto } from './vision.dto';
import { RadarService } from './radar.service';

@Controller('radar')
export class RadarController {
  constructor(private readonly radarService: RadarService) {}
  @Post()
  calculateCoordinates(@Body() visionDto: VisionDto) {
    return this.radarService.calculateCoordinates(visionDto);
  }
}
