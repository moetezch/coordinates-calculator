import { Test, TestingModule } from '@nestjs/testing';
import { RadarService } from './radar.service';

describe('RadarService', () => {
  let service: RadarService;
  const mockedBody = {
    protocols: ['avoid-mech'],
    scan: [
      {
        coordinates: { x: 0, y: 40 },
        enemies: { type: 'soldier', number: 10 },
      },
      {
        coordinates: { x: 0, y: 80 },
        allies: 5,
        enemies: { type: 'mech', number: 1 },
      },
    ],
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RadarService],
    }).compile();

    service = module.get<RadarService>(RadarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should return correct coordinates given specific data', async () => {
    const coordinates = await service.calculateCoordinates(mockedBody);
    expect(coordinates.x).toEqual(0);
    expect(coordinates.y).toEqual(40);
  });
});
