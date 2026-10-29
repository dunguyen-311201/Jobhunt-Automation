import type { JobCategory } from './taxonomy.js';

export type Classification =
  | { kind: 'NotIT'; reason: string }
  | { kind: 'IT'; category: JobCategory; matchedBy: 'title' | 'body' }
  | { kind: 'NeedsReview'; reason: string };

/**
 * Thứ tự quan trọng: vai trò hẹp (QA, DevOps, Support…) được kiểm tra trước Dev,
 * vì tiêu đề như "Fullstack Tester" hay "DevOps Engineer" cũng chứa từ khóa dev.
 */
const CATEGORY_RULES: ReadonlyArray<readonly [JobCategory, RegExp]> = [
  ['QA', /\b(tester|qa|qc)\b|manual test|automation test|kiểm thử/],
  ['DevOps', /devops|\bsre\b|cloud engineer|system engineer|kỹ sư hệ thống/],
  ['Support', /it support|help ?desk|service desk|technical support|application support/],
  ['BA', /business analyst|\bba\b|\bbrse\b/],
  ['PM', /project manager|\bpm\b|product owner|scrum master/],
  ['DataAI', /data engineer|data analyst|data scientist|ai engineer|machine learning|\bml engineer/],
  [
    'Dev',
    /developer|\bdev\b|lập trình|engineer|full.?stack|front.?end|back.?end|mobile|react|node|java|\.net|php|python|golang/,
  ],
];

const IT_SIGNAL = /\bit\b|cntt|công nghệ thông tin|phần mềm|software/;

const TITLE_LINES = 2;

export function classifyPost(text: string): Classification {
  const normalized = text.normalize('NFC').toLowerCase();
  const lines = normalized.split('\n').map((l) => l.trim()).filter(Boolean);
  const title = lines.slice(0, TITLE_LINES).join('\n');

  const fromTitle = matchCategory(title);
  if (fromTitle) return { kind: 'IT', category: fromTitle, matchedBy: 'title' };

  const fromBody = matchCategory(normalized);
  if (fromBody) return { kind: 'IT', category: fromBody, matchedBy: 'body' };

  if (IT_SIGNAL.test(normalized)) {
    return { kind: 'NeedsReview', reason: 'Có tín hiệu IT nhưng chưa xác định được nhóm nghề' };
  }
  return { kind: 'NotIT', reason: 'Không có từ khóa IT' };
}

function matchCategory(text: string): JobCategory | undefined {
  return CATEGORY_RULES.find(([, pattern]) => pattern.test(text))?.[0];
}
