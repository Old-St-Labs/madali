import { render } from '@testing-library/react';

import ReportHeader from './report-header';

describe('ReportHeader', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReportHeader />);
        
        expect(baseElement).toBeTruthy();
    });
});
