export class VisionDto {
  protocols: string[];
  scan: {
    coordinates: { x: number; y: number };
    enemies: { type: string; number: number };
    allies?: number;
  }[];
}
