import { render, screen } from '@testing-library/react';
import AppLayout from './layout';

// Mock next/navigation
const mockUsePathname = jest.fn(() => '/');
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock child components
jest.mock('./footer', () => ({
  __esModule: true,
  default: () => <footer data-testid="footer">Footer</footer>,
}));

jest.mock('./navbar', () => ({
  __esModule: true,
  default: () => <nav data-testid="navbar">Navbar</nav>,
}));

jest.mock('./page-transition', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="page-transition">{children}</div>
  ),
}));

describe('AppLayout', () => {
  it('renders navbar, content, and footer for non-admin routes', () => {
    render(
      <AppLayout>
        <div data-testid="content">Page Content</div>
      </AppLayout>,
    );
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('page-transition')).toBeInTheDocument();
  });

  it('renders only children for admin routes', () => {
    mockUsePathname.mockReturnValue('/admin');
    render(
      <AppLayout>
        <div data-testid="admin-content">Admin Content</div>
      </AppLayout>,
    );
    expect(screen.getByTestId('admin-content')).toBeInTheDocument();
    expect(screen.queryByTestId('navbar')).not.toBeInTheDocument();
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
});
