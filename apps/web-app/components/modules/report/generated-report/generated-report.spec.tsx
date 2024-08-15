import { render } from '@testing-library/react';

import GeneratedReport from './generated-report';

describe('GeneratedReport', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<GeneratedReport />);
        
        expect(baseElement).toBeTruthy();
    });
});
