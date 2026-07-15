import { render, screen } from '@testing-library/react';
import { Providers } from './provider';

describe('Providers', () => {
  it('renders children', () => {
    render(
      <Providers>
        <div data-testid="child">Child Content</div>
      </Providers>,
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
  });
});
