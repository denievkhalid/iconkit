import { Git } from "@git";
import {
  asyncHandler,
  forOf,
  getEnv,
  getEnvs,
  getRouter,
  processSvgFile,
} from "@shared";
import { upload, UploadFiles } from "@upload";

export default getRouter().post(
  "/",
  upload.array(getEnv("upload_icons_field")),
  asyncHandler(async (req, res) => {
    const files = req.files as UploadFiles;

    //console.log(files);
    return;

    // const { GITHUB_AUTH_TOKEN, GITHUB_ORG } = getEnvs([
    //   "github_org",
    //   "github_auth_token",
    // ]);
    //
    // await Git.init({
    //   authToken: GITHUB_AUTH_TOKEN,
    //   org: GITHUB_ORG,
    // }).createRepo();
    //
    // forOf(files, processSvgFile);
  }),
);
