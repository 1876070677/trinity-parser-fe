export enum ContributorRole {
  OWNER = 'owner',
  CONTRIBUTOR = 'contributor',
}

export interface Contributor {
  id: string;
  name: string;
  role: ContributorRole;
  description: string | null;
  part: string | null;
  imgUrl: string | null;
}
