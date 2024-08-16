import { PartialType } from '@nestjs/swagger';
import { PredefinedQuestionDto } from './predefined.question.dto';

export class UpdatePredefinedQuestionDto extends PartialType(PredefinedQuestionDto) {}