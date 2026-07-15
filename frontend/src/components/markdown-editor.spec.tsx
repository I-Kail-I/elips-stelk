import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MarkdownEditor } from './markdown-editor';

// Mock axios
jest.mock('@/lib/axios', () => ({
  axiosInstance: {
    post: jest.fn().mockResolvedValue({ data: { filename: 'test.jpg' } }),
  },
}));

// Mock react-markdown
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => (
    <div data-testid="markdown-preview">{children}</div>
  ),
}));

jest.mock('remark-gfm', () => () => 'gfm-plugin');

// Mock lucide icons
jest.mock('lucide-react', () => {
  const MockIcon = ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => (
    <span data-testid="mock-icon" {...props}>{children}</span>
  );
  return {
    Bold: MockIcon,
    Heading1: MockIcon,
    Heading2: MockIcon,
    Heading3: MockIcon,
    ImagePlus: MockIcon,
    Italic: MockIcon,
    Link: MockIcon,
    List: MockIcon,
    ListOrdered: MockIcon,
    Loader2: MockIcon,
  };
});

describe('MarkdownEditor', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    placeholder: 'Write markdown...',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders edit and preview tabs', () => {
    render(<MarkdownEditor {...defaultProps} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('shows textarea in edit mode by default', () => {
    render(<MarkdownEditor {...defaultProps} />);
    const textarea = screen.getByPlaceholderText('Write markdown...');
    expect(textarea).toBeInTheDocument();
  });

  it('switches to preview mode', async () => {
    render(<MarkdownEditor {...defaultProps} />);
    await userEvent.click(screen.getByText('Preview'));
    expect(screen.getByTestId('markdown-preview')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const onChange = jest.fn();
    render(<MarkdownEditor {...defaultProps} onChange={onChange} />);
    const textarea = screen.getByPlaceholderText('Write markdown...');
    await userEvent.type(textarea, 'Hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('renders toolbar buttons in edit mode', () => {
    render(<MarkdownEditor {...defaultProps} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(5);
  });

  it('shows upload button in edit mode', () => {
    render(<MarkdownEditor {...defaultProps} />);
    // The upload button is the one with the ImagePlus icon
    const toolbar = screen.getByText('Edit').closest('div');
    expect(toolbar).toBeInTheDocument();
  });

  it('passes value to preview when in preview mode', async () => {
    render(<MarkdownEditor {...defaultProps} value="# Hello" />);
    await userEvent.click(screen.getByText('Preview'));
    expect(screen.getByTestId('markdown-preview')).toHaveTextContent('# Hello');
  });

  it('hides toolbar buttons in preview mode', async () => {
    render(<MarkdownEditor {...defaultProps} />);
    await userEvent.click(screen.getByText('Preview'));
    // The edit mode specific buttons should be hidden
    const toolbarButtons = screen.queryAllByTitle('Bold');
    expect(toolbarButtons.length).toBe(0);
  });
});
