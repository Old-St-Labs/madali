import { render } from '@testing-library/react';

import ReportFooter from './report-footer';

describe('ReportFooter', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReportFooter />);
        
        expect(baseElement).toBeTruthy();
    });
});
