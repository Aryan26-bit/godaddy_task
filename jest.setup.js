import { TextEncoder, TextDecoder } from "util";

// Polyfill TextEncoder and TextDecoder for Jest
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
