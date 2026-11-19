import { Info, Search, Gavel } from 'lucide-react';

export type SiteProfile = {
  websiteName: string;
  filingNumber: string;
  websiteDescription: string;
  websiteUrl: string;
  contactEmail: string;
  logoUrl: string;
  keywords: string;
  copyright: string;
};

export function SettingsForm({
  siteProfile,
  onFieldChange,
  text,
}: {
  siteProfile: SiteProfile;
  onFieldChange: (field: keyof SiteProfile, value: string) => void;
  text: {
    headerTitle: string;
    headerDescription: string;
    basicInfo: string;
    websiteName: string;
    filingNumber: string;
    websiteUrl: string;
    contactEmail: string;
    logoUrl: string;
    descriptionSeo: string;
    websiteDescription: string;
    keywords: string;
    keywordsHint: string;
    compliance: string;
    copyright: string;
  };
}) {
  return (
    <main className="flex-1 overflow-y-auto p-8 pb-32 md:p-12">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="mb-8">
          <h2 className="mb-2 font-serif text-5xl leading-[1.1] tracking-tight text-brand-ink">
            {text.headerTitle}
          </h2>
          <p className="font-sans text-lg leading-relaxed text-brand-muted">
            {text.headerDescription}
          </p>
        </header>

        <section className="rounded-xl border border-brand-border/50 bg-brand-surface p-6 md:p-8">
          <h3 className="mb-6 flex items-center gap-2 font-serif text-2xl text-brand-coral">
            <Info size={24} />
            {text.basicInfo}
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label={text.websiteName}
              value={siteProfile.websiteName}
              onChange={(value) => onFieldChange('websiteName', value)}
            />
            <InputField
              label={text.filingNumber}
              value={siteProfile.filingNumber}
              onChange={(value) => onFieldChange('filingNumber', value)}
            />
            <div className="md:col-span-2">
              <InputField
                label={text.websiteUrl}
                type="url"
                value={siteProfile.websiteUrl}
                onChange={(value) => onFieldChange('websiteUrl', value)}
              />
            </div>
            <InputField
              label={text.contactEmail}
              type="email"
              value={siteProfile.contactEmail}
              onChange={(value) => onFieldChange('contactEmail', value)}
            />
            <InputField
              label={text.logoUrl}
              type="url"
              value={siteProfile.logoUrl}
              onChange={(value) => onFieldChange('logoUrl', value)}
            />
          </div>
        </section>

        <section className="rounded-xl border border-brand-border/50 bg-brand-surface p-6 md:p-8">
          <h3 className="mb-6 flex items-center gap-2 font-serif text-2xl text-brand-coral">
            <Search size={24} />
            {text.descriptionSeo}
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-muted">
                {text.websiteDescription}
              </label>
              <textarea
                className="w-full resize-none rounded border border-brand-border bg-brand-cream px-4 py-3 font-sans text-base text-brand-ink transition-colors focus:border-brand-coral focus:outline-none focus:ring-0"
                rows={4}
                value={siteProfile.websiteDescription}
                onChange={(event) => onFieldChange('websiteDescription', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <InputField
                label={text.keywords}
                value={siteProfile.keywords}
                onChange={(value) => onFieldChange('keywords', value)}
              />
              <p className="mt-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-brand-outline">
                {text.keywordsHint}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-brand-border/50 bg-brand-surface p-6 md:p-8">
          <h3 className="mb-6 flex items-center gap-2 font-serif text-2xl text-brand-coral">
            <Gavel size={24} />
            {text.compliance}
          </h3>
          <div className="space-y-4">
            <InputField
              label={text.copyright}
              value={siteProfile.copyright}
              onChange={(value) => onFieldChange('copyright', value)}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function InputField({
  label,
  type = 'text',
  value,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-muted">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border-b border-brand-border bg-brand-cream px-2 py-3 font-sans text-base text-brand-ink transition-colors placeholder:text-brand-muted/50 focus:border-brand-coral focus:outline-none focus:ring-0"
      />
    </div>
  );
}
