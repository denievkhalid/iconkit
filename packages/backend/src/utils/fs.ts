import fs from 'fs';

export const createFile = (filePath: string, data: string) => fs.writeFileSync(filePath, data);

export const ensureDirectoriesExist = (dirs: string[]) => {
  for (const dir of dirs) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      throw err;
    }
  }
};
