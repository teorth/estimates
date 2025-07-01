"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
// @ts-ignore no-implicit-any
const initModule = require("./z3-built");
const high_level_1 = require("./high-level");
const low_level_1 = require("./low-level");
__exportStar(require("./high-level/types"), exports);
__exportStar(require("./low-level/types.__GENERATED__"), exports);
/**
 * The main entry point to the Z3 API
 *
 * ```typescript
 * import { init, sat } from 'z3-solver';
 *
 * const { Context } = await init();
 * const { Solver, Int } = new Context('main');
 *
 * const x = Int.const('x');
 * const y = Int.const('y');
 *
 * const solver = new Solver();
 * solver.add(x.add(2).le(y.sub(10))); // x + 2 <= y - 10
 *
 * if (await solver.check() !== sat) {
 *   throw new Error("couldn't find a solution")
 * }
 * const model = solver.model();
 *
 * console.log(`x=${model.get(x)}, y=${model.get(y)}`);
 * // x=0, y=12
 * ```
 * @category Global */
async function init() {
    const lowLevel = await (0, low_level_1.init)(initModule);
    const highLevel = (0, high_level_1.createApi)(lowLevel.Z3);
    return { ...lowLevel, ...highLevel };
}
