interface RoleBadgeProps {
  role: string;
  className?: string;
}

export function RoleBadge({ role, className = '' }: RoleBadgeProps) {
  return (
    <span
      className={`bg-primary/10 text-primary border-border/30 inline-block rounded-md border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${className}`}
    >
      {role}
    </span>
  );
}
