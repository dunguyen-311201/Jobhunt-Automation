import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ClassificationController } from './classification.controller.js';

describe('ClassificationController', () => {
  let controller: ClassificationController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ClassificationController],
    }).compile();
    controller = moduleRef.get(ClassificationController);
  });

  it('trả về nhóm nghề của một bài đăng', () => {
    expect(controller.preview({ text: 'Tuyển NodeJS Developer 2 năm' })).toMatchObject({
      kind: 'IT',
      category: 'Dev',
    });
  });

  it('từ chối text rỗng', () => {
    expect(() => controller.preview({ text: '   ' })).toThrow(BadRequestException);
  });
});
