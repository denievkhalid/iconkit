import asyncHandler from 'express-async-handler';
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { commitAndPushRepo, createRepo, generateRepoName, upload } from '@/lib';
import { transform } from '@svgr/core';
import { getOptimizeSvg } from '@/utils';
import { Paths } from '@/config';

export const uploadRouter = express.Router();

uploadRouter.post(
  '/',
  upload.array('icons'),
  asyncHandler(async (req, res) => {
    const files = req.files as Express.Multer.File[];

    const exportEntries: string[] = [];

    const repoName = generateRepoName();

    const repoDir = path.resolve(Paths.REPOSITORIES, repoName);
    const iconsDir = path.resolve(repoDir, Paths.ICONS);

    await fs.mkdir(iconsDir, { recursive: true });

    for (const file of files) {
      const optimizedSvg = getOptimizeSvg(await fs.readFile(file.path, 'utf-8'));

      const componentName =
        `Icon` +
        path
          .basename(file.path, '.svg')
          .replace(/(^\w|-\w)/g, (m) => m.replace('-', '').toUpperCase());

      const jsxCode = await transform(
        optimizedSvg,
        {
          icon: true,
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
          typescript: true,
          exportType: 'named',
          namedExport: componentName,
          jsxRuntimeImport: { source: 'react', defaultSpecifier: 'React' },
          prettier: false,
          jsxRuntime: 'automatic',
        },
        { componentName },
      );

      await fs.writeFile(path.join(iconsDir, `${componentName}.tsx`), jsxCode, 'utf-8');

      exportEntries.push(`export { ${componentName} } from './icons/${componentName}';`);
    }

    const indexPath = path.join(repoDir, 'index.ts');
    await fs.writeFile(indexPath, exportEntries.join('\n'), 'utf-8');


    // const {
    //   data: { clone_url: repoUrl },
    // } = await createRepo(repoName);
    //
    // await commitAndPushRepo({ localPath: repoDir, repoUrl });
  }),
);
