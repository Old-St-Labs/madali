import { Alert, Button, Delete, Input } from '@ui';

export interface ReportQuestionItemProps {
    questionNumber: number;
    questionId: string;
    questionText: string;
    isDeletable: boolean;
    onDelete: (questionNumber: string) => void;
    onUpdate: (questionNumber: string, updatedText: string) => void;
}

export function ReportQuestionItem({
    questionNumber,
    questionId,
    questionText,
    isDeletable,
    onDelete,
    onUpdate,
}: ReportQuestionItemProps) {
    return (
        <div className="container flex justify-between items-center">
            <div className="flex flex-col w-full">
                <h6 className="text-B800 mb-2 font-bold">
                    QUESTION {questionNumber}
                </h6>
                <div className="flex-1 w-full">
                    <Input
                        component="textarea"
                        placeholder="Enter question here"
                        value={questionText}
                        variant={isDeletable ? 'default' : 'error'}
                        onChange={(value: string) =>
                            onUpdate(questionId, value)
                        }
                        className="mb-4 w-full"
                    />
                </div>

                {!isDeletable && (
                    <span className="text-error400 text-sm flex justify-start w-full">
                        <Alert size={18} />
                        <p className="px-2">
                            Cannot delete. You must have at least one (1)
                            question to generate a report.
                        </p>
                    </span>
                )}
            </div>
            <div className="ml-4">
                <Button
                    label=""
                    onClick={() => onDelete(questionId)}
                    size="sm"
                    leftIcon={Delete}
                    variant="tertiary"
                    isRounded
                />
            </div>
        </div>
    );
}

export default ReportQuestionItem;
