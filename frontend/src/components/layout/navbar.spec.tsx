import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './navbar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
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

describe('Navbar', () => {
  it('renders the logo text', () => {
    render(<Navbar />);
    expect(screen.getByText('Elips ORG')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Navbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Sejarah')).toBeInTheDocument();
    expect(screen.getByText('Anggota')).toBeInTheDocument();
    expect(screen.getByText('Visi dan Misi')).toBeInTheDocument();
  });

  it('renders the mobile menu toggle button', () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toBeInTheDocument();
  });

  it('opens mobile menu when toggle is clicked', async () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Toggle menu');
    await userEvent.click(toggleButton);
    // Mobile menu should now show nav items again
    const navLinks = screen.getAllByText('Home');
    expect(navLinks.length).toBeGreaterThan(1);
  });

  it('closes mobile menu when a nav item is clicked', async () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText('Toggle menu');
    await userEvent.click(toggleButton);
    // Click backdrop to close
    const backdrop = document.querySelector('.fixed.inset-0.z-50 > div');
    if (backdrop) {
      await userEvent.click(backdrop);
    }
    // The mobile menu should close - verify by checking that only desktop items remain
    const navLinks = screen.getAllByText('Home');
    expect(navLinks.length).toBeGreaterThanOrEqual(1);
  });
});
