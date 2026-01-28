"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
const calculateHash = (index, previousHash, timeStamp, data) => crypto_js_1.default.SHA256(index + previousHash + timeStamp + data).toString();
console.log(calculateHash(123, "asdgas34re", "150273", "data"));
//# sourceMappingURL=main.js.map