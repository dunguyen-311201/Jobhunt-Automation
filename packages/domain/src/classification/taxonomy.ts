export const JOB_CATEGORIES = ['Dev', 'DevOps', 'QA', 'BA', 'Support', 'DataAI', 'PM'] as const;
export type JobCategory = (typeof JOB_CATEGORIES)[number];

/** Chế độ của một nhóm nghề trong app: Theo dõi / Ẩn / Bỏ qua. */
export type CategoryMode = 'Follow' | 'Hidden' | 'Skip';
