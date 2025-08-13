import { optimize } from "svgo";

/**
 * Optimizes an SVG string using SVGO.
 *
 * Applies SVGO's optimization algorithm with multipass enabled,
 * which allows multiple optimization rounds for better results.
 *
 * @param {string} data - The raw SVG string to be optimized.
 * @returns {string} - The optimized SVG string.
 */
export const getOptimizeSvg = (data: string): string =>
  optimize(data, {
    multipass: true,
  }).data;

export const processSvgFile = async (file: Express.Multer.File) => {
  console.log(file);
};
