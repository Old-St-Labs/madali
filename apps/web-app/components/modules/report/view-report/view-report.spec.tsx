import { render } from '@testing-library/react';

import ViewReport from './view-report';

describe('ViewReport', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ViewReport />);

        expect(baseElement).toBeTruthy();
    });
});
