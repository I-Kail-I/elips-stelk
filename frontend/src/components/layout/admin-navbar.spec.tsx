import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminNavbar from './admin-navbar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/admin',
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; [key: string]: unknown }) => (
    <img {...props} alt={props.alt} />
  ),
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('AdminNavbar', () => {
  it('renders the admin panel text', () => {
    render(<AdminNavbar />);
    expect(screen.getByText('Panel Admin')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<AdminNavbar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Aktivitas')).toBeInTheDocument();
    expect(screen.getByText('Anggota')).toBeInTheDocument();
    expect(screen.getByText('Sejarah')).toBeInTheDocument();
    expect(screen.getByText('Visi & Misi')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders mobile menu toggle button', () => {
    render(<AdminNavbar />);
    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toBeInTheDocument();
  });

  it('opens mobile menu when toggle is clicked', async () => {
    render(<AdminNavbar />);
    const toggleButton = screen.getByLabelText('Toggle menu');
    await userEvent.click(toggleButton);
    const navLinks = screen.getAllByText('Dashboard');
    expect(navLinks.length).toBeGreaterThan(1);
  });
});
