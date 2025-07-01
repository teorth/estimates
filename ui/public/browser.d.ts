import { Z3HighLevel } from './high-level';
import { Z3LowLevel } from './low-level';
export * from './high-level/types';
export { Z3Core, Z3LowLevel } from './low-level';
export * from './low-level/types.__GENERATED__';
export declare function init(): Promise<Z3LowLevel & Z3HighLevel>;
