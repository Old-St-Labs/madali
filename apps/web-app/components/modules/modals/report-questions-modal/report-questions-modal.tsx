import { Add, Button, Drawer } from '@ui';
import { EventEmitter } from '@web-app/config/eventEmitter';
import { useReportContext } from '@web-app/context/reportContext';
import { useEffect, useState } from 'react';
import ReportQuestionItem from './report-question-item/report-question-item';

/* eslint-disable-next-line */
export interface ReportQuestionsModalProps {}

export function ReportQuestionsModal(props: ReportQuestionsModalProps) {
    const { reportQuestions, updateReportQuestions } = useReportContext();

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
        setIsDeletable(true);

        updateReportQuestions([
            ...reportQuestions,
            {
                id: reportQuestions.length + 1,
                question: '',
            },
        ]);
    };

    const handleDelete = (questionId: number) => {
        if (reportQuestions.length === 1) {
            setIsDeletable(false);

            return;
        }

        updateReportQuestions([
            ...reportQuestions.filter((question) => question.id !== questionId),
        ]);
    };

    const updateQuestion = (questionId: number, updatedQuestion: string) => {
        updateReportQuestions([
            ...reportQuestions.map((question) => {
                if (question.id === questionId) {
                    return { ...question, question: updatedQuestion };
                }

                return question;
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
                            questionText={item.question}
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
