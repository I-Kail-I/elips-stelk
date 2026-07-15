import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { getPaginatedItems, Pagination, usePagination } from './pagination';

function UsePaginationTest({ items, itemsPerPage }: { items: number[]; itemsPerPage: number }) {
  const { totalPages } = usePagination(items, itemsPerPage);
  return <div data-testid="total-pages">{totalPages}</div>;
}

describe('usePagination', () => {
  it('returns totalPages based on items and itemsPerPage', () => {
    render(<UsePaginationTest items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} itemsPerPage={3} />);
    expect(screen.getByTestId('total-pages')).toHaveTextContent('4');
  });

  it('returns at least 1 page even for empty array', () => {
    render(<UsePaginationTest items={[]} itemsPerPage={10} />);
    expect(screen.getByTestId('total-pages')).toHaveTextContent('1');
  });
});

describe('getPaginatedItems', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('returns first page items', () => {
    expect(getPaginatedItems(items, 1, 3)).toEqual([1, 2, 3]);
  });

  it('returns second page items', () => {
    expect(getPaginatedItems(items, 2, 3)).toEqual([4, 5, 6]);
  });

  it('returns last page items', () => {
    expect(getPaginatedItems(items, 4, 3)).toEqual([10]);
  });

  it('handles empty items', () => {
    expect(getPaginatedItems([], 1, 10)).toEqual([]);
  });
});

describe('Pagination', () => {
  it('returns null when totalPages is 1', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={jest.fn()} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders page buttons', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />,
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={jest.fn()} />,
    );
    const currentBtn = screen.getByText('3');
    expect(currentBtn).toHaveClass('bg-primary');
  });

  it('calls onPageChange when clicking a page number', async () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />,
    );
    await userEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when clicking next', async () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />,
    );
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    await userEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />,
    );
    const prevButton = screen.getAllByRole('button')[0];
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={jest.fn()} />,
    );
    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[buttons.length - 1];
    expect(nextButton).toBeDisabled();
  });

  it('shows dots for large page ranges', () => {
    render(
      <Pagination currentPage={5} totalPages={20} onPageChange={jest.fn()} />,
    );
    const dots = screen.getAllByText('...');
    expect(dots.length).toBeGreaterThan(0);
  });
});
