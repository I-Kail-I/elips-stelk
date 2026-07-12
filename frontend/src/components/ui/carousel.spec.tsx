import { fireEvent, render, screen } from '@testing-library/react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';

import '@testing-library/jest-dom';

// Mock embla-carousel-react
const mockScrollPrev = jest.fn();
const mockScrollNext = jest.fn();
const mockCanScrollPrev = jest.fn(() => true);
const mockCanScrollNext = jest.fn(() => true);
const mockOn = jest.fn();
const mockOff = jest.fn();

const mockEmblaApi = {
  scrollPrev: mockScrollPrev,
  scrollNext: mockScrollNext,
  canScrollPrev: mockCanScrollPrev,
  canScrollNext: mockCanScrollNext,
  on: mockOn,
  off: mockOff,
};

jest.mock('embla-carousel-react', () => jest.fn(() => [jest.fn(), mockEmblaApi]));

describe('Carousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const carousel = screen.getByRole('region');
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    expect(carousel).toHaveAttribute('data-slot', 'carousel');
  });

  it('applies custom className to Carousel', () => {
    render(
      <Carousel className="custom-carousel">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const carousel = screen.getByRole('region');
    expect(carousel).toHaveClass('custom-carousel');
  });

  it('has default relative positioning class', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const carousel = screen.getByRole('region');
    expect(carousel).toHaveClass('relative');
  });

  it('passes additional HTML attributes', () => {
    render(
      <Carousel id="test-carousel" data-testid="carousel-test">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const carousel = screen.getByTestId('carousel-test');
    expect(carousel).toHaveAttribute('id', 'test-carousel');
  });

  it('handles horizontal orientation by default', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const content = screen.getByText('Slide 1').closest('[data-slot="carousel-content"]');
    const innerDiv = content?.firstChild as HTMLElement;
    expect(innerDiv).toHaveClass('flex');
  });

  it('handles vertical orientation', () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const content = screen.getByText('Slide 1').closest('[data-slot="carousel-content"]');
    const innerDiv = content?.firstChild as HTMLElement;
    expect(innerDiv).toHaveClass('flex-col');
  });
});

describe('CarouselContent', () => {
  it('renders correctly', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const content = screen.getByText('Slide 1').closest('[data-slot="carousel-content"]');
    expect(content).toBeInTheDocument();
  });

  it('has overflow hidden class', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const content = screen.getByText('Slide 1').closest('[data-slot="carousel-content"]');
    expect(content).toHaveClass('overflow-hidden');
  });

  it('applies custom className', () => {
    render(
      <Carousel>
        <CarouselContent className="custom-content">
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const innerDiv = screen.getByText('Slide 1').parentElement;
    expect(innerDiv).toHaveClass('custom-content');
  });

  it('renders multiple children', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });
});

describe('CarouselItem', () => {
  it('renders correctly', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide Content</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const item = screen.getByText('Slide Content');
    expect(item).toBeInTheDocument();
    expect(item).toHaveAttribute('role', 'group');
    expect(item).toHaveAttribute('aria-roledescription', 'slide');
    expect(item).toHaveAttribute('data-slot', 'carousel-item');
  });

  it('has basis-full class', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide Content</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const item = screen.getByText('Slide Content');
    expect(item).toHaveClass('basis-full');
  });

  it('has shrink-0 and grow-0 classes', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide Content</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const item = screen.getByText('Slide Content');
    expect(item).toHaveClass('shrink-0');
    expect(item).toHaveClass('grow-0');
  });

  it('applies custom className', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem className="custom-item">Slide Content</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const item = screen.getByText('Slide Content');
    expect(item).toHaveClass('custom-item');
  });

  it('has horizontal padding by default', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide Content</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const item = screen.getByText('Slide Content');
    expect(item).toHaveClass('pl-4');
  });

  it('has vertical padding in vertical orientation', () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Slide Content</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const item = screen.getByText('Slide Content');
    expect(item).toHaveClass('pt-4');
  });
});

describe('CarouselPrevious', () => {
  it('renders correctly', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /previous slide/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-slot', 'carousel-previous');
  });

  it('has sr-only text for accessibility', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>,
    );

    const srText = screen.getByText('Previous slide');
    expect(srText).toHaveClass('sr-only');
  });

  it('has absolute positioning classes', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /previous slide/i });
    expect(button).toHaveClass('absolute');
    expect(button).toHaveClass('touch-manipulation');
    expect(button).toHaveClass('rounded-full');
  });

  it('applies custom className', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="custom-prev" />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /previous slide/i });
    expect(button).toHaveClass('custom-prev');
  });

  it('handles horizontal positioning classes', () => {
    render(
      <Carousel orientation="horizontal">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /previous slide/i });
    expect(button).toHaveClass('inset-y-0');
    expect(button).toHaveClass('-left-12');
    expect(button).toHaveClass('my-auto');
  });

  it('handles vertical positioning classes', () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /previous slide/i });
    expect(button).toHaveClass('-top-12');
    expect(button).toHaveClass('left-1/2');
    expect(button).toHaveClass('-translate-x-1/2');
    expect(button).toHaveClass('rotate-90');
  });

  it('calls scrollPrev on click', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /previous slide/i });
    fireEvent.click(button);
    expect(mockScrollPrev).toHaveBeenCalled();
  });
});

describe('CarouselNext', () => {
  it('renders correctly', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /next slide/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-slot', 'carousel-next');
  });

  it('has sr-only text for accessibility', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>,
    );

    const srText = screen.getByText('Next slide');
    expect(srText).toHaveClass('sr-only');
  });

  it('has absolute positioning classes', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /next slide/i });
    expect(button).toHaveClass('absolute');
    expect(button).toHaveClass('touch-manipulation');
    expect(button).toHaveClass('rounded-full');
  });

  it('applies custom className', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselNext className="custom-next" />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /next slide/i });
    expect(button).toHaveClass('custom-next');
  });

  it('handles horizontal positioning classes', () => {
    render(
      <Carousel orientation="horizontal">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /next slide/i });
    expect(button).toHaveClass('inset-y-0');
    expect(button).toHaveClass('-right-12');
    expect(button).toHaveClass('my-auto');
  });

  it('handles vertical positioning classes', () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /next slide/i });
    expect(button).toHaveClass('-bottom-12');
    expect(button).toHaveClass('left-1/2');
    expect(button).toHaveClass('-translate-x-1/2');
    expect(button).toHaveClass('rotate-90');
  });

  it('calls scrollNext on click', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>,
    );

    const button = screen.getByRole('button', { name: /next slide/i });
    fireEvent.click(button);
    expect(mockScrollNext).toHaveBeenCalled();
  });
});

describe('Carousel Keyboard Navigation', () => {
  it('handles ArrowLeft key press', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const carousel = screen.getByRole('region');
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' });
    expect(mockScrollPrev).toHaveBeenCalled();
  });

  it('handles ArrowRight key press', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const carousel = screen.getByRole('region');
    fireEvent.keyDown(carousel, { key: 'ArrowRight' });
    expect(mockScrollNext).toHaveBeenCalled();
  });

  it('prevents default on arrow key press', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    const carousel = screen.getByRole('region');

    // Create a real KeyboardEvent and spy on preventDefault
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    jest.spyOn(event, 'preventDefault');

    fireEvent(carousel, event);

    expect(event.preventDefault).toHaveBeenCalled();
  });
});

describe('Carousel Integration', () => {
  it('renders complete carousel structure', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
          <CarouselItem>Slide 3</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous slide/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next slide/i })).toBeInTheDocument();
  });

  it('renders carousel with complex content', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div>
              <h2>Title 1</h2>
              <p>Description 1</p>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div>
              <h2>Title 2</h2>
              <p>Description 2</p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('handles vertical carousel with all components', () => {
    render(
      <Carousel orientation="vertical">
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    const item = screen.getByText('Slide 1');
    expect(item).toHaveClass('pt-4');
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('calls setApi callback when api is ready', () => {
    const setApiMock = jest.fn();

    render(
      <Carousel setApi={setApiMock}>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>,
    );

    expect(setApiMock).toHaveBeenCalledWith(mockEmblaApi);
  });
});
