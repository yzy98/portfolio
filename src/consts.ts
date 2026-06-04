import type { Metadata, Site, Social } from "@/types";

export const SITE: Site = {
  NAME: "ZYANG",
  EMAIL: "yz186337@gmail.com",
  NUM_WORKS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 2,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "A portfolio website of Zi Yang.",
};

export const WORK: Metadata = {
  TITLE: "Work",
  DESCRIPTION: "Where I have worked and what I have done.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Social[] = [
  {
    NAME: "x",
    HREF: "https://x.com/zi_yang72005",
  },
  {
    NAME: "github",
    HREF: "https://github.com/yzy98",
  },
];
