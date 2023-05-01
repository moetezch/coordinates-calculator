import { Test, TestingModule } from '@nestjs/testing';
import { RadarController } from './radar.controller';
import { RadarService } from './radar.service';

describe('RadarController', () => {
  let controller: RadarController;
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

  const mockRadarService = {
    calculateCoordinates: jest.fn(() => {
      return {
        x: 0,
        y: 40,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RadarController],
      providers: [
        {
          provide: RadarService,
          useValue: mockRadarService,
        },
      ],
    }).compile();

    controller = module.get<RadarController>(RadarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('it should return correct coordinates given specific data', async () => {
    await controller.calculateCoordinates(mockedBody);
    expect(mockRadarService.calculateCoordinates).toBeCalled();
  });
});
