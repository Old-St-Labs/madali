import { render } from '@testing-library/react';

import GeneratedReportPreview from './generated-report-preview';

describe('GeneratedReportPreview', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<GeneratedReportPreview />);
        
        expect(baseElement).toBeTruthy();
    });
});
