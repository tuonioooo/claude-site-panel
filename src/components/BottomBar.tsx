import { RotateCcw, Download, Save, Upload } from 'lucide-react';

export function BottomBar({
  isSidebarOpen,
  onReset,
  onImport,
  onExport,
  onSave,
  text,
}: {
  isSidebarOpen: boolean;
  onReset: () => void;
  onImport: () => void;
  onExport: () => void;
  onSave: () => void;
  text: {
    reset: string;
    importJson: string;
    exportJson: string;
    saveChanges: string;
  };
}) {
  return (
    <div
      className={`fixed bottom-0 right-0 left-0 z-50 flex items-center justify-end gap-4 border-t border-brand-border-dark bg-brand-dark/95 px-6 py-4 font-sans text-xs font-bold uppercase tracking-widest shadow-2xl backdrop-blur-sm transition-all duration-300 md:px-12 ${
        isSidebarOpen ? 'md:left-64' : 'md:left-20'
      }`}
    >
      <button
        onClick={onReset}
        className="flex items-center gap-2 rounded-md px-6 py-2 text-white/70 transition-all hover:bg-brand-coral/90 hover:text-white"
      >
        <RotateCcw size={16} />
        {text.reset}
      </button>
      <button
        onClick={onImport}
        className="flex items-center gap-2 rounded-md border border-white/20 px-6 py-2 text-white/70 transition-all hover:bg-brand-coral/90 hover:text-white"
      >
        <Upload size={16} />
        {text.importJson}
      </button>
      <button
        onClick={onExport}
        className="flex items-center gap-2 rounded-md border border-white/20 px-6 py-2 text-white/70 transition-all hover:bg-brand-coral/90 hover:text-white"
      >
        <Download size={16} />
        {text.exportJson}
      </button>
      <button
        onClick={onSave}
        className="flex items-center gap-2 rounded-md bg-brand-coral px-6 py-2 text-white transition-all duration-150 hover:bg-[#b5674d] active:scale-95"
      >
        <Save size={16} />
        {text.saveChanges}
      </button>
    </div>
  );
}
