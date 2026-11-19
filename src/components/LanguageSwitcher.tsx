import { Check, Globe, Languages } from 'lucide-react';

export function LanguageSwitcher({
  language,
  onSelect,
}: {
  language: 'en' | 'zh';
  onSelect: (language: 'en' | 'zh') => void;
}) {
  const options = [
    { value: 'zh' as const, label: '\u4e2d\u6587' },
    { value: 'en' as const, label: 'English' },
  ];

  return (
    <div className="group relative">
      <div className="flex items-center rounded-[22px] border border-brand-border/70 bg-brand-surface/90 p-2 shadow-[0_14px_32px_rgba(20,20,19,0.12)] backdrop-blur-sm">
        {/* <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-2xl text-brand-muted transition-colors hover:text-brand-ink"
          aria-label="Current language"
        >
          <Languages size={19} />
        </button> */}
        <Globe size={19} class="text-brand-coral" />
        {/* <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-cream text-brand-coral ring-1 ring-brand-border/60 transition-colors hover:bg-white"
          aria-haspopup="listbox"
          aria-label="Select language"
        >
          
        </button> */}
      </div>

      <div className="invisible absolute right-0 top-[calc(100%+10px)] z-50 min-w-[196px] overflow-hidden rounded-[16px] border border-brand-border/80 bg-brand-cream/98 opacity-0 shadow-[0_22px_44px_rgba(20,20,19,0.16)] transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <div className="py-2">
          {options.map((option) => {
            const active = option.value === language;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => onSelect(option.value)}
                className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors ${
                  active ? 'bg-brand-surface/75 text-brand-ink' : 'text-brand-muted hover:bg-brand-surface/45 hover:text-brand-ink'
                }`}
              >
                <span className="font-serif text-[16px]">{option.label}</span>
                <span
                  className={`text-brand-coral transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}
                >
                  <Check size={18} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
