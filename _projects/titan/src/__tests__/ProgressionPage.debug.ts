import { render, screen } from '@testing-library/react';
import ProgressionPage from '@/app/progression/page';

const { container } = render(<ProgressionPage />);
console.log(container.innerHTML.substring(0, 2000));
