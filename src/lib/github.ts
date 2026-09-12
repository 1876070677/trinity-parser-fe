const GITHUB_PROFILE_REGEX = /github\.com\/([a-zA-Z0-9-]+)/i;

export const extractGithubUsername = (text: string | null): string | null => {
  if (!text) return null;
  const match = text.match(GITHUB_PROFILE_REGEX);
  return match ? match[1] : null;
};

export const getGithubAvatarUrl = (username: string, size = 80): string =>
  `https://github.com/${username}.png?size=${size}`;
