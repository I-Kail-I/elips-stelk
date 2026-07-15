import { render, screen } from '@testing-library/react';
import { ErrorSection } from './error-section';

describe('ErrorSection', () => {
  it('renders with default props', () => {
    render(<ErrorSection />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Terjadi Kesalahan')).toBeInTheDocument();
    expect(
      screen.getByText('Gagal memuat data. Silakan coba lagi nanti.'),
    ).toBeInTheDocument();
  });

  it('renders with custom subtitle', () => {
    render(<ErrorSection subtitle="Custom Error" />);
    expect(screen.getByText('Custom Error')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<ErrorSection title="Custom Title" />);
    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  it('renders with custom description', () => {
    render(<ErrorSection description="Custom description" />);
    expect(screen.getByText('Custom description')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<ErrorSection message="Custom error message" />);
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    render(<ErrorSection />);
    expect(screen.queryByText('description')).not.toBeInTheDocument();
  });
});
