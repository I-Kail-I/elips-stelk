'use client';

import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link,
  List,
  ListOrdered,
  Loader2,
} from 'lucide-react';
import { useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { axiosInstance } from '@/lib/axios';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

type WrapType = 'bold' | 'italic' | 'h1' | 'h2' | 'h3' | 'ul' | 'ol' | 'link';

const wrappers: Record<WrapType, { prefix: string; suffix: string }> = {
  bold: { prefix: '**', suffix: '**' },
  italic: { prefix: '*', suffix: '*' },
  h1: { prefix: '# ', suffix: '' },
  h2: { prefix: '## ', suffix: '' },
  h3: { prefix: '### ', suffix: '' },
  ul: { prefix: '- ', suffix: '' },
  ol: { prefix: '1. ', suffix: '' },
  link: { prefix: '[', suffix: '](url)' },
};

export function MarkdownEditor({ value, onChange, placeholder }: Props) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [uploading, setUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const insertWrap = (type: WrapType) => {
    const ta = textareaRef.current;
    if (!ta) return;

    const { prefix, suffix } = wrappers[type];
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end);
    const wrapped = `${prefix}${selected || 'text'}${suffix}`;
    const before = value.slice(0, start);
    const after = value.slice(end);
    onChange(`${before}${wrapped}${after}`);
    requestAnimationFrame(() => {
      ta.selectionStart = ta.selectionEnd = start + wrapped.length;
      ta.focus();
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);

      const res = await axiosInstance.post('/files/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { filename } = res.data;
      const imageUrl = `/api/uploads/${filename}`;
      const markdown = `![${file.name}](${imageUrl})`;

      const ta = textareaRef.current;
      if (ta) {
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const before = value.slice(0, start);
        const after = value.slice(end);
        onChange(`${before}${markdown}${after}`);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + markdown.length;
          ta.focus();
        });
      } else {
        onChange(value ? `${value}\n${markdown}` : markdown);
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div className="border-border overflow-hidden rounded-xl border-2">
      <div className="bg-muted flex flex-wrap items-center justify-between gap-1 border-b px-3 py-1.5">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMode('edit')}
            className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              mode === 'edit' ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setMode('preview')}
            className={`cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              mode === 'preview' ? 'bg-background text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Preview
          </button>
        </div>

        {mode === 'edit' && (
          <div className="flex items-center gap-0.5">
            <ToolbarButton icon={Heading1} onClick={() => insertWrap('h1')} label="H1" />
            <ToolbarButton icon={Heading2} onClick={() => insertWrap('h2')} label="H2" />
            <ToolbarButton icon={Heading3} onClick={() => insertWrap('h3')} label="H3" />
            <span className="bg-border mx-0.5 h-4 w-px" />
            <ToolbarButton icon={Bold} onClick={() => insertWrap('bold')} label="Bold" />
            <ToolbarButton icon={Italic} onClick={() => insertWrap('italic')} label="Italic" />
            <span className="bg-border mx-0.5 h-4 w-px" />
            <ToolbarButton icon={List} onClick={() => insertWrap('ul')} label="List" />
            <ToolbarButton icon={ListOrdered} onClick={() => insertWrap('ol')} label="Ordered" />
            <ToolbarButton icon={Link} onClick={() => insertWrap('link')} label="Link" />
            <span className="bg-border mx-0.5 h-4 w-px" />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center rounded-md p-1 transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
            </button>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {mode === 'edit' ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-background w-full resize-y border-0 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/50"
          rows={8}
        />
      ) : (
        <div className="bg-background prose prose-sm dark:prose-invert max-w-none px-3 py-2 text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value || (placeholder ? `*${placeholder}*` : '')}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

function ToolbarButton({
  icon: Icon,
  onClick,
  label,
}: {
  icon: React.ComponentType<{ size?: number }>;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className="text-muted-foreground hover:text-foreground cursor-pointer rounded-md p-1 transition-colors"
    >
      <Icon size={16} />
    </button>
  );
}
