import { nanoid } from 'nanoid';
import simpleGit from 'simple-git';
import { Octokit } from '@octokit/rest';
import { getEnv } from '@/lib/env';

const git = new Octokit({ auth: getEnv('github_token') });

export const generateRepoName = () => nanoid(8);

export const createRepo = async (name: string) =>
  git.rest.repos.createInOrg({
    org: getEnv('github_org'),
    name,
    private: true,
  });

export const commitAndPushRepo = async ({
  localPath,
  repoUrl,
}: {
  localPath: string;
  repoUrl: string;
}) => {
  const git = simpleGit(localPath);

  await git.init();
  await git.add('.');
  await git.commit('Initial commit');
  await git.branch(['-M', 'main']);
  await git.addRemote('origin', repoUrl);
  await git.push('origin', 'main');
};
