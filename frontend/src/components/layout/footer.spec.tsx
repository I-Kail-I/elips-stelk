import { render, screen } from '@testing-library/react';
import Footer from './footer';

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
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe('Footer', () => {
  it('renders the brand name', () => {
    render(<Footer />);
    expect(screen.getByText('ELIPS')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);
    expect(screen.getByText('sejarah')).toBeInTheDocument();
    expect(screen.getByText('anggota')).toBeInTheDocument();
    expect(screen.getByText('Visi dan Misi')).toBeInTheDocument();
  });

  it('renders the current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} ELIPS. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders the Instagram link', () => {
    render(<Footer />);
    const instagramLink = screen.getByLabelText('Instagram');
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/elipstelk/');
  });

  it('renders Profil Organisasi heading', () => {
    render(<Footer />);
    expect(screen.getByText('Profil Organisasi')).toBeInTheDocument();
  });

  it('renders the map iframe', () => {
    render(<Footer />);
    const iframe = screen.getByTitle('Lokasi Elips');
    expect(iframe).toBeInTheDocument();
  });
});
