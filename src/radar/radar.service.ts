import { Injectable } from '@nestjs/common';
import { VisionDto } from './vision.dto';
import {
  ATTACK_RANGE,
  ENEMY_IS_MECH,
  INITIAL_COORDINATES,
} from 'src/utils/constants';
import { calcualteDistance } from 'src/utils/calculateDistance';
import { Protocols } from 'src/utils/protocols.types';

@Injectable()
export class RadarService {
  async calculateCoordinates(visionDto: VisionDto) {
    let filteredCoordinates = [];

    const scannedCoordinatesWithinAttackingRange = () => {
      filteredCoordinates = visionDto.scan.filter(
        (point) =>
          calcualteDistance(
            INITIAL_COORDINATES.x,
            INITIAL_COORDINATES.y,
            point.coordinates.x,
            point.coordinates.y,
          ) <= ATTACK_RANGE,
      );
    };
    scannedCoordinatesWithinAttackingRange();

    const filterCoordinates = (protocol) => {
      switch (protocol) {
        case Protocols.ClosestEnemies:
          filteredCoordinates.sort(
            (a, b) =>
              calcualteDistance(
                INITIAL_COORDINATES.x,
                INITIAL_COORDINATES.y,
                a.coordinates.x,
                a.coordinates.y,
              ) -
              calcualteDistance(
                INITIAL_COORDINATES.x,
                INITIAL_COORDINATES.y,
                b.coordinates.x,
                b.coordinates.y,
              ),
          );
          break;
        case Protocols.FurthestEnemies:
          filteredCoordinates.sort(
            (a, b) =>
              calcualteDistance(
                INITIAL_COORDINATES.x,
                INITIAL_COORDINATES.y,
                b.coordinates.x,
                b.coordinates.y,
              ) -
              calcualteDistance(
                INITIAL_COORDINATES.x,
                INITIAL_COORDINATES.y,
                a.coordinates.x,
                a.coordinates.y,
              ),
          );
          break;
        case Protocols.AssistAllies:
          const assistAllies = filteredCoordinates.filter(
            (point) => point.allies,
          );
          if (assistAllies.length > 0) {
            filteredCoordinates = assistAllies;
          }
          break;
        case Protocols.AvoidCrossfire:
          filteredCoordinates = filteredCoordinates.filter(
            (point) => !point.allies,
          );
          break;
        case Protocols.PrioritizeMech:
          const prioritizeMech = filteredCoordinates.filter(
            (point) => point.enemies.type === ENEMY_IS_MECH,
          );
          if (prioritizeMech.length > 0) {
            filteredCoordinates = prioritizeMech;
          }
          break;
        case Protocols.AvoidMech:
          filteredCoordinates = filteredCoordinates.filter(
            (point) => point.enemies.type !== ENEMY_IS_MECH,
          );
          break;
      }
    };

    visionDto.protocols.map((protocol) => {
      filterCoordinates(protocol);
    });

    return {
      x: filteredCoordinates[0].coordinates.x,
      y: filteredCoordinates[0].coordinates.y,
    };
  }
}
