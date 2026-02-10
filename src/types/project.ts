export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  techStack: unknown;
  imageUrl: string | null;
  status: 'draft' | 'published';
  featured: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  explorationLogs?: ExplorationLog[];
}

export interface ProjectListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: unknown;
  imageUrl: string | null;
  status: 'draft' | 'published';
  featured: boolean;
  publishedAt: string | null;
}

export interface ExplorationLog {
  id: string;
  projectId: string;
  step: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}
