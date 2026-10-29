import { describe, expect, it } from 'vitest';
import { classifyPost } from './classify-post.js';

// Slice đầu tiên của core domain (Classification & Matching).
// Mọi bài IT được giữ và gắn nhóm nghề; chỉ bài không phải IT mới bị bỏ.
describe('classifyPost', () => {
  it('bài sale không liên quan IT -> NotIT', () => {
    const r = classifyPost('TUYỂN NHÂN VIÊN TƯ VẤN BÁN HÀNG\nLương 8-10 triệu, làm tại Đà Nẵng');
    expect(r.kind).toBe('NotIT');
  });

  it('Manual Tester -> nhóm QA (vẫn giữ, không bỏ)', () => {
    const r = classifyPost('[HN] Tuyển Manual Tester 2 năm kinh nghiệm\nUp to 22M');
    expect(r).toMatchObject({ kind: 'IT', category: 'QA' });
  });

  it('ReactJS Developer -> nhóm Dev', () => {
    const r = classifyPost('Tuyển ReactJS Developer từ 3 năm kinh nghiệm\nOnsite Đà Nẵng');
    expect(r).toMatchObject({ kind: 'IT', category: 'Dev' });
  });

  it('DevOps Engineer -> nhóm DevOps', () => {
    const r = classifyPost('GLOBALTECH tuyển DEVOPS ENGINEER từ 01 năm KN\nCI/CD, Docker');
    expect(r).toMatchObject({ kind: 'IT', category: 'DevOps' });
  });

  it('bài Dev nhắc "phối hợp với QA" vẫn là Dev (vai trò lấy từ tiêu đề)', () => {
    const r = classifyPost(
      'TIZO TUYỂN DỤNG MIDDLE MOBILE & WEB DEVELOPER\nPhát triển React/Next.js\nPhối hợp chặt chẽ với team Product, UI/UX, Back-end và QA',
    );
    expect(r).toMatchObject({ kind: 'IT', category: 'Dev' });
  });

  it('bài IT chung chung không rõ vai trò -> NeedsReview', () => {
    const r = classifyPost('Bên em cần tuyển gấp nhân sự IT, ib em gửi JD nhé');
    expect(r.kind).toBe('NeedsReview');
  });
});
