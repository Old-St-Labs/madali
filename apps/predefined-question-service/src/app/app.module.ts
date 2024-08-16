import { Module } from '@nestjs/common';

import { PredefinedQuestionModule } from '../predefined-question/predefined-question.module';

@Module({
    imports: [PredefinedQuestionModule],
})
export class AppModule { }
