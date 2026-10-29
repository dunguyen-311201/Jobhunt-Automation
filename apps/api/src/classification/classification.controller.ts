import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { classifyPost, type Classification } from '@jobhunt/domain';

interface PreviewRequest {
  text?: unknown;
}

/** Endpoint tạm của Phase 0: xem nhanh rule phân loại gắn nhãn gì cho một bài. */
@Controller('classification')
export class ClassificationController {
  @Post('preview')
  @HttpCode(200)
  preview(@Body() body: PreviewRequest): Classification {
    if (typeof body?.text !== 'string' || body.text.trim() === '') {
      throw new BadRequestException('text phải là chuỗi không rỗng');
    }
    return classifyPost(body.text);
  }
}
