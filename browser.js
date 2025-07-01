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
const high_level_1 = require("./high-level");
const low_level_1 = require("./low-level");
__exportStar(require("./high-level/types"), exports);
__exportStar(require("./low-level/types.__GENERATED__"), exports);
async function init() {
    const initZ3 = global.initZ3;
    if (initZ3 === undefined) {
        throw new Error('initZ3 was not imported correctly. Please consult documentation on how to load Z3 in browser');
    }
    const lowLevel = await (0, low_level_1.init)(initZ3);
    const highLevel = (0, high_level_1.createApi)(lowLevel.Z3);
    return { ...lowLevel, ...highLevel };
}
