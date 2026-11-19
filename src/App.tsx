import { useRef, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { SettingsForm } from './components/SettingsForm';
import { BottomBar } from './components/BottomBar';
import Login from './login';

const AUTH_STORAGE_KEY = 'site-panel:auth';
const SITE_STORAGE_KEY = 'site-panel:site-profile';
const LANGUAGE_STORAGE_KEY = 'site-panel:language';

const DEMO_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

const defaultSiteProfile = {
  websiteName: 'Manuscript Journal',
  filingNumber: 'ICP-20250001',
  websiteDescription:
    'A Claude-inspired site panel used to manage site identity, metadata, and core public information.',
  websiteUrl: 'https://manuscript.example.com',
  contactEmail: 'editor@manuscript.example.com',
  logoUrl: 'https://manuscript.example.com/assets/logo.svg',
  keywords: 'claude theme, site panel, manuscript, editorial',
  copyright: 'Copyright 2025 Manuscript. All rights reserved.',
};

const messages = {
  en: {
    statusReady: 'Local cache ready',
    statusSaved: 'Saved to local cache',
    statusLoginSuccess: 'Login successful',
    statusLoggedOut: 'Logged out',
    statusUnsaved: 'Unsaved changes',
    statusReset: 'Reset to defaults',
    statusImportFailed: 'Import failed: invalid JSON file',
    loginError: 'Invalid username or password. Use the demo account.',
    demoHelper: `Demo account: ${DEMO_CREDENTIALS.username} / ${DEMO_CREDENTIALS.password}`,
    imported: (name: string) => `Imported ${name} into local cache`,
    exported: (name: string) => `Exported ${name}`,
    login: {
      welcome: 'Welcome back. Please sign in.',
      username: 'Username',
      usernamePlaceholder: 'admin',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      signIn: 'Sign In',
      privacyPrefix: 'Protected by Manuscript Security.',
      privacyLink: 'Privacy Policy',
      privacySuffix: 'Read our',
    },
    panel: {
      docs: 'Docs',
      help: 'Help',
      sidebarTitle: 'Site Panel',
      sidebarSubtitle: 'Single page',
      settings: 'Settings',
      logoutTitle: 'Log out',
      headerTitle: 'Site Configuration',
      headerDescription: 'Manage site information after login, then import or export JSON with local cache.',
      basicInfo: 'Basic Information',
      websiteName: 'Website Name',
      filingNumber: 'Filing Number',
      websiteUrl: 'Website URL',
      contactEmail: 'Contact Email',
      logoUrl: 'Logo URL',
      descriptionSeo: 'Description & SEO',
      websiteDescription: 'Website Description',
      keywords: 'Keywords',
      keywordsHint: 'Separate multiple keywords with commas.',
      compliance: 'Compliance & Copyright',
      copyright: 'Copyright',
      reset: 'Reset',
      importJson: 'Import JSON',
      exportJson: 'Export JSON',
      saveChanges: 'Save Changes',
    },
  },
  zh: {
    statusReady: '\u672c\u5730\u7f13\u5b58\u5df2\u5c31\u7eea',
    statusSaved: '\u5df2\u4fdd\u5b58\u5230\u672c\u5730\u7f13\u5b58',
    statusLoginSuccess: '\u767b\u5f55\u6210\u529f',
    statusLoggedOut: '\u5df2\u9000\u51fa\u767b\u5f55',
    statusUnsaved: '\u6709\u672a\u4fdd\u5b58\u7684\u66f4\u6539',
    statusReset: '\u5df2\u6062\u590d\u9ed8\u8ba4\u503c',
    statusImportFailed: '\u5bfc\u5165\u5931\u8d25\uff1aJSON \u6587\u4ef6\u65e0\u6548',
    loginError: '\u7528\u6237\u540d\u6216\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u4f7f\u7528\u6f14\u793a\u8d26\u53f7\u767b\u5f55\u3002',
    demoHelper: `\u6f14\u793a\u8d26\u53f7\uff1a${DEMO_CREDENTIALS.username} / ${DEMO_CREDENTIALS.password}`,
    imported: (name: string) => `\u5df2\u5bfc\u5165 ${name} \u5230\u672c\u5730\u7f13\u5b58`,
    exported: (name: string) => `\u5df2\u5bfc\u51fa ${name}`,
    login: {
      welcome: '\u6b22\u8fce\u56de\u6765\uff0c\u8bf7\u5148\u767b\u5f55\u3002',
      username: '\u7528\u6237\u540d',
      usernamePlaceholder: 'admin',
      password: '\u5bc6\u7801',
      passwordPlaceholder: '\u8bf7\u8f93\u5165\u5bc6\u7801',
      signIn: '\u767b\u5f55',
      privacyPrefix: '\u53d7 Manuscript Security \u4fdd\u62a4\u3002',
      privacyLink: '\u9690\u79c1\u653f\u7b56',
      privacySuffix: '\u67e5\u770b\u6211\u4eec\u7684',
    },
    panel: {
      docs: '\u6587\u6863',
      help: '\u5e2e\u52a9',
      sidebarTitle: '\u7ad9\u70b9\u9762\u677f',
      sidebarSubtitle: '\u5355\u9875\u6a21\u5f0f',
      settings: '\u8bbe\u7f6e',
      logoutTitle: '\u9000\u51fa\u767b\u5f55',
      headerTitle: '\u7f51\u7ad9\u914d\u7f6e',
      headerDescription: '\u767b\u5f55\u540e\u53ef\u7ba1\u7406\u7f51\u7ad9\u4fe1\u606f\uff0c\u5e76\u652f\u6301\u5bfc\u5165\u6216\u5bfc\u51fa JSON \u5230\u672c\u5730\u7f13\u5b58\u3002',
      basicInfo: '\u57fa\u7840\u4fe1\u606f',
      websiteName: '\u7f51\u7ad9\u540d\u79f0',
      filingNumber: '\u5907\u6848\u53f7',
      websiteUrl: '\u7f51\u7ad9\u5730\u5740',
      contactEmail: '\u8054\u7cfb\u90ae\u7bb1',
      logoUrl: 'Logo \u5730\u5740',
      descriptionSeo: '\u7b80\u4ecb\u4e0e SEO',
      websiteDescription: '\u7f51\u7ad9\u7b80\u4ecb',
      keywords: '\u5173\u952e\u8bcd',
      keywordsHint: '\u591a\u4e2a\u5173\u952e\u8bcd\u8bf7\u4f7f\u7528\u9017\u53f7\u5206\u9694\u3002',
      compliance: '\u5408\u89c4\u4e0e\u7248\u6743',
      copyright: '\u7248\u6743\u4fe1\u606f',
      reset: '\u91cd\u7f6e',
      importJson: '\u5bfc\u5165 JSON',
      exportJson: '\u5bfc\u51fa JSON',
      saveChanges: '\u4fdd\u5b58\u66f4\u6539',
    },
  },
};

function normalizeSiteProfile(input: any) {
  return {
    websiteName: input?.websiteName ?? defaultSiteProfile.websiteName,
    filingNumber: input?.filingNumber ?? defaultSiteProfile.filingNumber,
    websiteDescription: input?.websiteDescription ?? defaultSiteProfile.websiteDescription,
    websiteUrl: input?.websiteUrl ?? defaultSiteProfile.websiteUrl,
    contactEmail: input?.contactEmail ?? defaultSiteProfile.contactEmail,
    logoUrl: input?.logoUrl ?? defaultSiteProfile.logoUrl,
    keywords: input?.keywords ?? defaultSiteProfile.keywords,
    copyright: input?.copyright ?? defaultSiteProfile.copyright,
  };
}

function readStoredAuth() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

function readStoredLanguage() {
  if (typeof window === 'undefined') {
    return 'zh';
  }

  return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'en' ? 'en' : 'zh';
}

function readStoredSiteProfile() {
  if (typeof window === 'undefined') {
    return defaultSiteProfile;
  }

  const rawValue = window.localStorage.getItem(SITE_STORAGE_KEY);
  if (!rawValue) {
    return defaultSiteProfile;
  }

  try {
    return normalizeSiteProfile(JSON.parse(rawValue));
  } catch {
    return defaultSiteProfile;
  }
}

function downloadJson(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(readStoredAuth);
  const [siteProfile, setSiteProfile] = useState(readStoredSiteProfile);
  const [loginError, setLoginError] = useState('');
  const [language, setLanguage] = useState(readStoredLanguage);
  const [statusMessage, setStatusMessage] = useState(() => messages[readStoredLanguage()].statusReady);
  const fileInputRef = useRef(null as any);
  const text = messages[language];

  const setAppLanguage = (nextLanguage: 'en' | 'zh') => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    setLanguage(nextLanguage);
  };

  const updateLanguage = (nextLanguage: 'en' | 'zh') => {
    setAppLanguage(nextLanguage);
    setStatusMessage(messages[nextLanguage].statusReady);
  };

  const toggleLanguage = () => {
    updateLanguage(language === 'en' ? 'zh' : 'en');
  };

  const persistSiteProfile = (nextProfile: any, message = text.statusSaved) => {
    setSiteProfile(nextProfile);
    window.localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(nextProfile));
    setStatusMessage(message);
  };

  const handleLogin = (username: string, password: string) => {
    const isValid =
      username.trim() === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password;

    if (!isValid) {
      setLoginError(text.loginError);
      return false;
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    setIsAuthenticated(true);
    setLoginError('');
    setStatusMessage(text.statusLoginSuccess);
    return true;
  };

  const handleLogout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
    setLoginError('');
    setStatusMessage(text.statusLoggedOut);
  };

  const handleFieldChange = (field: string, value: string) => {
    setSiteProfile((current: any) => ({
      ...current,
      [field]: value,
    }));
    setStatusMessage(text.statusUnsaved);
  };

  const handleSave = () => {
    persistSiteProfile(siteProfile);
  };

  const handleReset = () => {
    persistSiteProfile(defaultSiteProfile, text.statusReset);
  };

  const handleExport = () => {
    const filename = `site-profile-${new Date().toISOString().slice(0, 10)}.json`;
    downloadJson(filename, JSON.stringify(siteProfile, null, 2));
    setStatusMessage(text.exported(filename));
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const content = await file.text();
      const imported = normalizeSiteProfile(JSON.parse(content));
      persistSiteProfile(imported, text.imported(file.name));
    } catch {
      setStatusMessage(text.statusImportFailed);
    } finally {
      event.target.value = '';
    }
  };

  if (!isAuthenticated) {
    return (
      <Login
        errorMessage={loginError}
        helperText={text.demoHelper}
        onLogin={handleLogin}
        language={language}
        onToggleLanguage={toggleLanguage}
        text={text.login}
      />
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-brand-cream text-brand-ink selection:bg-brand-coral/20">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleImportFile}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        title={text.panel.sidebarTitle}
        subtitle={text.panel.sidebarSubtitle}
        settingsLabel={text.panel.settings}
      />
      <div className="relative flex h-screen flex-1 flex-col overflow-hidden">
        <TopBar
          onLogout={handleLogout}
          onSelectLanguage={updateLanguage}
          statusMessage={statusMessage}
          language={language}
          text={text.panel}
        />
        <SettingsForm siteProfile={siteProfile} onFieldChange={handleFieldChange} text={text.panel} />
        <BottomBar
          isSidebarOpen={isSidebarOpen}
          onReset={handleReset}
          onImport={handleImportClick}
          onExport={handleExport}
          onSave={handleSave}
          text={text.panel}
        />
      </div>
    </div>
  );
}
