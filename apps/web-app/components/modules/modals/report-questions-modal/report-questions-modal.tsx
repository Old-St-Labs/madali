import { Add, Button, Drawer } from '@ui';
import { EventEmitter } from '@web-app/config/eventEmitter';
import { useSessionStore } from '@web-app/hooks/state-management';
import { useEffect, useState } from 'react';
import ReportQuestionItem from './report-question-item/report-question-item';

/* eslint-disable-next-line */
export interface ReportQuestionsModalProps {}

export function ReportQuestionsModal(props: ReportQuestionsModalProps) {
    const { reportQuestions, updateReportQuestions } = useSessionStore(
        (state) => state
    );

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [isDeletable, setIsDeletable] = useState(true);

    useEffect(() => {
        EventEmitter.subscribe(
            EventEmitter.events.UpdateReportQuestion,
            setModalOpen
        );

        return () => {
            EventEmitter.unsubscribe(EventEmitter.events.UpdateReportQuestion);
        };
    }, []);

    const addNewQuestion = () => {
        const randomStringId = Math.random().toString(36).substring(2, 15);

        setIsDeletable(true);

        // TODO: Update if we need to send new question to API
        updateReportQuestions([
            ...reportQuestions,
            {
                id: `local-${randomStringId}-${reportQuestions.length + 1}`,
                question: '',
                questionType: 'text',
                updatedQuestion: '',
            },
        ]);
    };

    const handleDelete = (questionId: string) => {
        if (reportQuestions.length === 1) {
            setIsDeletable(false);

            return;
        }

        updateReportQuestions([
            ...reportQuestions.filter(
                (reportQuestion) => reportQuestion.id !== questionId
            ),
        ]);
    };

    const updateQuestion = (questionId: string, updatedQuestion: string) => {
        updateReportQuestions([
            ...reportQuestions.map((reportQuestion) => {
                if (reportQuestion.id === questionId) {
                    return {
                        ...reportQuestion,
                        updatedQuestion: updatedQuestion,
                    };
                }

                return reportQuestion;
            }),
        ]);
    };

    return (
        <Drawer isVisible={modalOpen} onToggle={() => setModalOpen(false)}>
            <div className="p-6 flex flex-col justify-between h-full overflow-y-auto">
                <div>
                    <h4 className="text-T1 text-2xl font-bold py-8">
                        Report Question
                    </h4>

                    {reportQuestions.map((item, index) => (
                        <ReportQuestionItem
                            key={item.id}
                            questionNumber={index + 1}
                            questionId={item.id}
                            questionText={
                                item.updatedQuestion === ''
                                    ? item.question
                                    : item.updatedQuestion
                            }
                            isDeletable={isDeletable}
                            onDelete={handleDelete}
                            onUpdate={updateQuestion}
                        />
                    ))}

                    <Button
                        label="Add question"
                        onClick={() => {
                            addNewQuestion();
                        }}
                        variant="secondary"
                        size="sm"
                        leftIcon={Add}
                        className="mt-4"
                    />
                </div>

                <div className="flex justify-between mt-4">
                    <Button
                        label="Cancel"
                        onClick={() => {
                            setModalOpen(false);
                        }}
                        variant="secondary"
                        size="sm"
                    />

                    <Button
                        label="Regenerate report"
                        onClick={() => {}}
                        variant="primary"
                        size="sm"
                    />
                </div>
            </div>
        </Drawer>
    );
}

export default ReportQuestionsModal;
