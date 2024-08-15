import { render } from '@testing-library/react';

import ReportSidenav from './report-sidenav';

describe('ReportSidenav', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ReportSidenav />);
        
        expect(baseElement).toBeTruthy();
    });
});
