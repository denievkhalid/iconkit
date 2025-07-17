import { createServer } from '@/server';
import { ensureDirectoriesExist } from '@/utils';
import type { AppOptions } from '@/types';

export class App {
  private readonly ensureDirs: string[];
  private readonly port: string;

  constructor(options: AppOptions) {
    this.ensureDirs = options.ensureDirs;
    this.port = options.port;

    this.init();
  }

  init() {
    ensureDirectoriesExist(this.ensureDirs);
  }

  start() {
    createServer(this.port);
  }
}

export const createApp = (options: AppOptions) => new App(options);
