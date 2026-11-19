import { ArrowRight } from 'lucide-react';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import './login.css';

export default function Login({
  onLogin,
  errorMessage,
  helperText,
  language,
  onToggleLanguage,
      text,
}: {
  onLogin: (username: string, password: string) => boolean;
  errorMessage?: string;
  helperText?: string;
  language: 'en' | 'zh';
  onToggleLanguage: () => void;
  text: {
    welcome: string;
    username: string;
    usernamePlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    signIn: string;
    privacyPrefix: string;
    privacyLink: string;
    privacySuffix: string;
  };
}) {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onLogin(String(formData.get('username') ?? ''), String(formData.get('password') ?? ''));
  };

  return (
    <div className="login-page flex min-h-screen flex-col items-center justify-center px-6 antialiased">
      <div className="absolute top-8 right-8">
        <LanguageSwitcher
          language={language}
          onSelect={(nextLanguage) => {
            if (nextLanguage !== language) {
              onToggleLanguage();
            }
          }}
        />
      </div>

      <main className="flex w-full max-w-md flex-col items-center">
        <div className="mb-12 text-center">
          <h1
            className="mb-2 text-5xl tracking-tight text-[var(--color-login-ink)]"
            style={{ fontFamily: 'var(--font-login-headline)' }}
          >
            Manuscript
          </h1>
          <p className="text-[16px] text-[var(--color-login-muted)]">{text.welcome}</p>
        </div>

        <div className="mb-8 w-full rounded-xl border border-[var(--color-login-surface)] bg-white p-8 sm:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-[18px] text-[var(--color-login-ink)]"
                style={{ fontFamily: 'var(--font-login-headline)' }}
              >
                {text.username}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder={text.usernamePlaceholder}
                required
                className="w-full rounded-t-sm border-0 border-b border-[#e0d8c8] bg-[color:color-mix(in_srgb,var(--color-login-surface)_30%,transparent)] px-4 py-3 text-[16px] text-[var(--color-login-ink)] outline-none transition-colors placeholder:text-[#a39e95] focus:border-[var(--color-login-coral)]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-[18px] text-[var(--color-login-ink)]"
                style={{ fontFamily: 'var(--font-login-headline)' }}
              >
                {text.password}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder={text.passwordPlaceholder}
                required
                className="w-full rounded-t-sm border-0 border-b border-[#e0d8c8] bg-[color:color-mix(in_srgb,var(--color-login-surface)_30%,transparent)] px-4 py-3 text-[16px] text-[var(--color-login-ink)] outline-none transition-colors placeholder:text-[#a39e95] focus:border-[var(--color-login-coral)]"
              />
            </div>

            {errorMessage ? (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </p>
            ) : null}

            <div className="pt-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-login-coral)] px-6 py-3 text-[16px] font-medium text-white transition-colors hover:bg-[#b5654a]"
              >
                {text.signIn}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-2 text-center text-sm text-[#a39e95]">
          {helperText ? <p>{helperText}</p> : null}
          <p>
            {text.privacyPrefix} <br className="sm:hidden" /> {text.privacySuffix}{' '}
            <a href="#" className="underline hover:text-[var(--color-login-ink)]">
              {text.privacyLink}
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
