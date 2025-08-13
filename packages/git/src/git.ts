import { Octokit } from "@octokit/rest";
import { generateId } from "@shared";
import type { GitProps } from "./types";

export class Git {
  private octokit: Octokit;
  private readonly org: string;

  constructor(args: GitProps) {
    this.org = args.org;
    this.octokit = new Octokit({ auth: args.authToken });
  }

  async createRepo() {
    let repoId = generateId();

    while (await this.repoExists(repoId)) {
      repoId = generateId();
    }

    return repoId;
  }

  async repoExists(repoName: string): Promise<boolean> {
    try {
      await this.octokit.repos.get({
        owner: this.org,
        repo: repoName,
      });
      return true;
    } catch {
      return false;
    }
  }

  static init(args: GitProps) {
    return new Git(args);
  }
}
