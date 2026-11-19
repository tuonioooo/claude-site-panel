import { LogOut } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export function TopBar({
  onLogout,
  onSelectLanguage,
  statusMessage,
  language,
  text,
}: {
  onLogout: () => void;
  onSelectLanguage: (language: 'en' | 'zh') => void;
  statusMessage: string;
  language: 'en' | 'zh';
  text: {
    docs: string;
    help: string;
    logoutTitle: string;
  };
}) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-brand-surface bg-brand-cream px-8 font-serif text-lg tracking-tight">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold text-brand-ink md:hidden">Manuscript</div>
        <p className="hidden font-sans text-xs font-semibold uppercase tracking-[0.24em] text-brand-outline md:block">
          {statusMessage}
        </p>
      </div>
      <div className="hidden gap-6 md:flex">
        <a href="#" className="px-2 py-1 text-brand-muted transition-colors hover:text-brand-ink">
          {text.docs}
        </a>
        <a href="#" className="px-2 py-1 text-brand-muted transition-colors hover:text-brand-ink">
          {text.help}
        </a>
      </div>
      <div className="flex items-center gap-6">
        <LanguageSwitcher language={language} onSelect={onSelectLanguage} />
        <button
          onClick={onLogout}
          title={text.logoutTitle}
          className="rounded-full p-2 text-brand-muted transition-colors hover:bg-brand-surface/50 hover:text-brand-ink"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
