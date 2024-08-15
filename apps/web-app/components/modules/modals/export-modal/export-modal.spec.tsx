import { render } from '@testing-library/react';

import ExportModal from './export-modal';

describe('ExportModal', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<ExportModal />);
        
        expect(baseElement).toBeTruthy();
    });
});
