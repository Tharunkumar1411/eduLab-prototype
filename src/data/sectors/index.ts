/**
 * Central Sectors Registry for Explore Markets.
 */

import { SectorData } from './types.ts';
import { FMCG_SECTOR_DATA } from './fmcg.ts';
import { BANKING_SECTOR_DATA } from './banking.ts';
import { TECHNOLOGY_SECTOR_DATA } from './technology.ts';
import { AUTOMOBILES_SECTOR_DATA } from './automobiles.ts';
import { PHARMA_SECTOR_DATA } from './pharma.ts';

export * from './types.ts';
export { FMCG_SECTOR_DATA } from './fmcg.ts';
export { BANKING_SECTOR_DATA } from './banking.ts';
export { TECHNOLOGY_SECTOR_DATA } from './technology.ts';
export { AUTOMOBILES_SECTOR_DATA } from './automobiles.ts';
export { PHARMA_SECTOR_DATA } from './pharma.ts';

export const ALL_SECTORS: SectorData[] = [
  FMCG_SECTOR_DATA,
  BANKING_SECTOR_DATA,
  TECHNOLOGY_SECTOR_DATA,
  AUTOMOBILES_SECTOR_DATA,
  PHARMA_SECTOR_DATA,
];

export const SECTORS_BY_ID: Record<string, SectorData> = {
  fmcg: FMCG_SECTOR_DATA,
  banking: BANKING_SECTOR_DATA,
  technology: TECHNOLOGY_SECTOR_DATA,
  automobiles: AUTOMOBILES_SECTOR_DATA,
  pharma: PHARMA_SECTOR_DATA,
};

export function getSectorById(id: string): SectorData | undefined {
  return SECTORS_BY_ID[id.toLowerCase()];
}
