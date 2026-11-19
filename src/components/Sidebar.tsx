import { Settings, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

export function Sidebar({
  isOpen,
  toggleSidebar,
  title,
  subtitle,
  settingsLabel,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
  title: string;
  subtitle: string;
  settingsLabel: string;
}) {
  return (
    <aside
      className={`relative hidden h-screen shrink-0 flex-col space-y-4 border-r border-brand-border/30 bg-brand-surface py-6 transition-all duration-300 md:flex ${
        isOpen ? 'w-64 px-6' : 'w-20 px-3'
      }`}
    >
      <div className={`mb-12 flex h-10 items-center ${isOpen ? 'gap-4' : 'justify-center'}`}>
        {isOpen ? (
          <>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-coral font-serif text-xl tracking-tight text-white">
              EP
            </div>
            <div className="overflow-hidden whitespace-nowrap">
              <h1 className="font-serif text-xl leading-tight text-brand-ink">{title}</h1>
              <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-brand-muted">
                {subtitle}
              </p>
            </div>
          </>
        ) : (
          <button
            onClick={toggleSidebar}
            title="Expand sidebar"
            className="cursor-pointer rounded-md p-2 text-brand-muted transition-colors hover:bg-brand-cream/50 hover:text-brand-ink"
          >
            <PanelLeftOpen size={20} />
          </button>
        )}
      </div>

      {isOpen ? (
        <button
          onClick={toggleSidebar}
          title="Collapse sidebar"
          className="absolute top-8 right-4 rounded-md p-1.5 text-brand-muted transition-colors hover:bg-brand-cream/50 hover:text-brand-ink"
        >
          <PanelLeftClose size={18} />
        </button>
      ) : null}

      <nav className="w-full flex-1 space-y-2">
        <NavItem icon={<Settings size={20} />} label={settingsLabel} active isOpen={isOpen} />
      </nav>
    </aside>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  isOpen,
}: {
  icon: any;
  label: string;
  active?: boolean;
  isOpen: boolean;
}) {
  return (
    <a
      href="#"
      title={!isOpen ? label : undefined}
      className={`flex w-full items-center rounded-lg font-serif text-base font-medium transition-all duration-300 ${
        isOpen ? 'gap-4 px-3 py-3' : 'justify-center p-3'
      } ${
        active
          ? `bg-brand-cream text-brand-coral shadow-sm ${isOpen ? 'translate-x-1' : ''}`
          : 'text-brand-muted hover:bg-brand-cream/50 hover:text-brand-coral'
      }`}
    >
      <div className="shrink-0">{icon}</div>
      {isOpen ? <span className="whitespace-nowrap">{label}</span> : null}
    </a>
  );
}
