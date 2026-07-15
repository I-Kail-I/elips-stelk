import { render, screen } from '@testing-library/react';
import PageTransition from './page-transition';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
      <div data-testid="motion-div" {...props}>{children}</div>
    ),
  },
}));

describe('PageTransition', () => {
  it('renders children', () => {
    render(
      <PageTransition>
        <div data-testid="child">Page Content</div>
      </PageTransition>,
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Page Content');
  });

  it('uses default color and duration', () => {
    const { container } = render(
      <PageTransition>
        <div>Content</div>
      </PageTransition>,
    );
    const motionDivs = container.querySelectorAll('[data-testid="motion-div"]');
    expect(motionDivs.length).toBe(2);
  });

  it('renders without crashing with custom props', () => {
    render(
      <PageTransition color="#ff0000" duration={1}>
        <div>Content</div>
      </PageTransition>,
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
