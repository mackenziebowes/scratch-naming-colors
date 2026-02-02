import chroma from "chroma-js";
// @ts-expect-error - static-kdtree doesn't provide types, but the API is simple
import createKDTree from "static-kdtree";
import { colornames as allnames } from "./allcolors";
import { colornames as bestof } from "./bestof";
import { colornames as short } from "./short";

export const allKeys = Object.keys(allnames);
export const bestOfKeys = Object.keys(bestof);
export const shortKeys = Object.keys(short);

export const allPoints = allKeys.map((hex) => chroma(hex).lab());
export const bestOfPoints = bestOfKeys.map((hex) => chroma(hex).lab());
export const shortPoints = shortKeys.map((hex) => chroma(hex).lab());

export const allTree = createKDTree(allPoints);
export const bestOfTree = createKDTree(bestOfPoints);
export const shortTree = createKDTree(shortPoints);
