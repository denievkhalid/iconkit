// src/server.ts
import cors from "cors";
import express2 from "express";

// src/routes/upload.ts
import asyncHandler from "express-async-handler";
import express from "express";
import fs2 from "fs/promises";
import path2 from "path";

// src/lib/git.ts
import { nanoid } from "nanoid";
import simpleGit from "simple-git";
import { Octokit } from "@octokit/rest";

// src/lib/env.ts
import { configDotenv } from "dotenv";
configDotenv();
var getEnv = (field) => process.env[field.toUpperCase()] || "";

// src/lib/git.ts
var git = new Octokit({ auth: getEnv("github_token") });
var generateRepoName = () => nanoid(8);

// src/lib/multer.ts
import multer from "multer";
import path from "path";
import { nanoid as nanoid2 } from "nanoid";
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(process.cwd(), "upload" /* UPLOAD */));
  },
  filename: (req, file, cb) => {
    cb(null, `${nanoid2(10)}${path.extname(file.originalname)}`);
  }
});
var upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/svg+xml") {
      cb(null, true);
    } else {
      cb(new Error("\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0442\u0438\u043F \u0444\u0430\u0439\u043B\u0430. \u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u044B \u0442\u043E\u043B\u044C\u043A\u043E JPEG, PNG \u0438 PDF."));
    }
  }
});

// src/routes/upload.ts
import { transform } from "@svgr/core";

// src/utils/fs.ts
import fs from "fs";
var ensureDirectoriesExist = (dirs) => {
  for (const dir of dirs) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      throw err;
    }
  }
};

// src/utils/svg.ts
import { optimize } from "svgo";
var getOptimizeSvg = (data) => optimize(data, {
  multipass: true
}).data;

// src/routes/upload.ts
var uploadRouter = express.Router();
uploadRouter.post(
  "/",
  upload.array("icons"),
  asyncHandler(async (req, res) => {
    const files = req.files;
    const exportEntries = [];
    const repoName = generateRepoName();
    const repoDir = path2.resolve("repositories" /* REPOSITORIES */, repoName);
    const iconsDir = path2.resolve(repoDir, "icons" /* ICONS */);
    await fs2.mkdir(iconsDir, { recursive: true });
    for (const file of files) {
      const optimizedSvg = getOptimizeSvg(await fs2.readFile(file.path, "utf-8"));
      const componentName = `Icon` + path2.basename(file.path, ".svg").replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());
      const jsxCode = await transform(
        optimizedSvg,
        {
          icon: true,
          plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx", "@svgr/plugin-prettier"],
          typescript: true,
          exportType: "named",
          namedExport: componentName,
          jsxRuntimeImport: { source: "react", defaultSpecifier: "React" },
          prettier: false,
          jsxRuntime: "automatic"
        },
        { componentName }
      );
      await fs2.writeFile(path2.join(iconsDir, `${componentName}.tsx`), jsxCode, "utf-8");
      exportEntries.push(`export { ${componentName} } from './icons/${componentName}';`);
    }
    const indexPath = path2.join(repoDir, "index.ts");
    await fs2.writeFile(indexPath, exportEntries.join("\n"), "utf-8");
    console.log(indexPath);
  })
);

// src/server.ts
var createServer = (port) => {
  const app = express2();
  app.use(cors());
  app.use(express2.json());
  app.use(express2.urlencoded({ extended: true }));
  app.use("/upload", uploadRouter);
  app.listen(port);
};

// src/app.ts
var App = class {
  constructor(options) {
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
};
var createApp = (options) => new App(options);

// src/index.ts
createApp({
  ensureDirs: ["repositories" /* REPOSITORIES */, "upload" /* UPLOAD */],
  port: getEnv("port")
}).start();
