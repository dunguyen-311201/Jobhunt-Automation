import { Module } from '@nestjs/common';
import { ClassificationController } from './classification.controller.js';

@Module({ controllers: [ClassificationController] })
export class ClassificationModule {}
