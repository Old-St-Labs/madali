import { render } from '@testing-library/react';

import ReportQuestionsModal from './report-questions-modal';

describe('ReportQuestionsModal', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReportQuestionsModal />);
        
        expect(baseElement).toBeTruthy();
    });
});
