import { OmitType } from "@nestjs/swagger";
import { PredefinedQuestionDto } from "./predefined.question.dto";

export class CreatePredefinedQuestionDto extends OmitType(PredefinedQuestionDto, ['predefinedQuestionId'] as const) { }