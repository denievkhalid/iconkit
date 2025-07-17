import { optimize } from 'svgo';

export const getOptimizeSvg = (data: string) =>
  optimize(data, {
    multipass: true,
  }).data;
