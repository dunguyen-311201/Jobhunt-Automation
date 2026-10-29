import { Module } from '@nestjs/common';
import { ClassificationModule } from './classification/classification.module.js';
import { HealthController } from './health/health.controller.js';

@Module({
  imports: [ClassificationModule],
  controllers: [HealthController],
})
export class AppModule {}
