import type { IconName } from "@/content/services";

const PATHS: Record<IconName | "moq" | "box" | "clock" | "doc", React.ReactNode> = {
  import: (<><path d="M12 3v9" /><path d="m8.5 8.5 3.5 3.5 3.5-3.5" /><path d="M3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></>),
  export: (<><path d="M12 12V3" /><path d="m8.5 6.5 3.5-3.5 3.5 3.5" /><path d="M3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" /></>),
  cross: (<><path d="M3 8h13" /><path d="m12.5 4.5 3.5 3.5-3.5 3.5" /><path d="M21 16H8" /><path d="m11.5 12.5-3.5 3.5 3.5 3.5" /></>),
  distribution: (<><circle cx="12" cy="5" r="2.3" /><circle cx="5" cy="19" r="2.3" /><circle cx="19" cy="19" r="2.3" /><path d="M12 7.3v4.4" /><path d="M12 11.7 6.4 17" /><path d="m12 11.7 5.6 5.3" /></>),
  label: (<><path d="M3 11.6V4.7A1.7 1.7 0 0 1 4.7 3h6.9L21 12.4 12.4 21Z" /><circle cx="7.6" cy="7.6" r="1.35" /></>),
  globe: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.4 2.9 2.4 15.1 0 18" /><path d="M12 3c-2.4 2.9-2.4 15.1 0 18" /></>),
  moq: (<><path d="M3 8.5 12 4l9 4.5-9 4.5Z" /><path d="M3 8.5v7L12 20l9-4.5v-7" /><path d="M12 13v7" /></>),
  box: (<><rect x="2.5" y="6" width="19" height="12" rx="1" /><path d="M6.5 6v12M10.5 6v12M14.5 6v12M18.5 6v12" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3 2" /></>),
  doc: (<><path d="M6 3h8l4 4v14H6Z" /><path d="M14 3v4h4" /><path d="M9 12h6M9 16h6" /></>),
};

export function Icon({ name, size = 24 }: { name: keyof typeof PATHS; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`rtl:-scale-x-100 ${className}`} width="15" height="9" viewBox="0 0 15 9" fill="none" aria-hidden="true">
      <path d="M0 4.5h13M9.2.8 13 4.5 9.2 8.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
