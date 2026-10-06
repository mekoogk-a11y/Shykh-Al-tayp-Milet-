import React, { useState } from 'react';
import { 
  BookOpen, 
  Radio, 
  Search, 
  Menu, 
  X, 
  Clock, 
  Download,
  Smartphone,
  Compass
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isInstallable, isInstalled, isIOS, installApp } = usePWAInstall();

  const navItems = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'lectures', label: 'محاضرات ودروس الشيخ', icon: Radio },
    { id: 'researches', label: 'بحوث ودراسات علمية', icon: BookOpen },
    { id: 'about', label: 'سيرة الشيخ ومنهجه' },
    { id: 'contact', label: 'تواصل واستفتاء' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#08281c]/95 backdrop-blur-md border-b border-[#c49a37]/30 text-white shadow-xl">
      {/* Top Quranic banner */}
      <div className="bg-[#051c14] border-b border-[#c49a37]/20 py-1.5 px-4 text-xs font-amiri text-[#e0cfab] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#c49a37] hidden sm:inline">۞</span>
          <span className="tracking-wide">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
          <span className="hidden md:inline text-white/40 text-[11px]">|</span>
          <span className="hidden md:inline text-white/80">«قُلْ هَٰذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ عَلَىٰ بَصِيرَةٍ أَنَا وَمَنِ اتَّبَعَنِي»</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5 text-[#e0cfab]">
            <Clock className="w-3.5 h-3.5 text-[#c49a37]" />
            <span className="hidden sm:inline">منهج التوسط والاعتدال</span>
          </div>
          
          {/* In-app install trigger */}
          {!isInstalled && (
            <button
              onClick={() => {
                if (isIOS) {
                  alert('لتثبيت التطبيق على جهاز الآيفون:\nاضغط زر المشاركة (Share) في المتصفح ثم اختر "إضافة إلى الصفحة الرئيسية" (Add to Home Screen).');
                } else {
                  installApp();
                }
              }}
              className="flex items-center gap-1.5 bg-[#c49a37] hover:bg-[#d8aa3d] text-[#08281c] px-2.5 py-0.5 rounded-md font-bold text-[11px] shadow-sm transition-all"
              title="تثبيت المنصة كتطبيق على هاتفك أو حاسوبك"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>تثبيت التطبيق</span>
            </button>
          )}
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Identity */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c49a37] via-[#a37c22] to-[#0f4430] p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#08281c] rounded-[10px] flex items-center justify-center border border-[#c49a37]/40">
                <Compass className="w-6 h-6 text-[#ffd875]" />
              </div>
            </div>
            <div>
              <h1 className="font-amiri text-xl sm:text-2xl font-bold text-[#fcfbf8] tracking-tight group-hover:text-[#ffd875] transition-colors leading-tight">
                موقع الشيخ الطيب مليط عكود
              </h1>
              <p className="text-[11px] text-[#c49a37] font-medium tracking-wide">
                المنصة العلمية والدعوية الرسمية
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-lg transition-all duration-200 flex items-center gap-1.5 relative ${
                    isActive 
                      ? 'text-[#ffd875] bg-[#0c3827] shadow-inner font-semibold' 
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 text-[#c49a37]" />}
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#c49a37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-lg text-white/80 hover:text-[#ffd875] hover:bg-white/10 transition-colors"
              title="بحث في المحاضرات والبحوث"
              aria-label="بحث"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* PWA Install Button in Desktop Header */}
            {!isInstalled && (
              <button
                onClick={() => {
                  if (isIOS) {
                    alert('لتثبيت التطبيق على جهاز الآيفون:\nاضغط زر المشاركة (Share) في المتصفح ثم اختر "إضافة إلى الصفحة الرئيسية" (Add to Home Screen).');
                  } else {
                    installApp();
                  }
                }}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#c49a37] to-[#a47b20] hover:brightness-110 text-[#08281c] font-bold px-3.5 py-2 rounded-lg text-xs shadow-md transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل التطبيق</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a2e21] border-b border-[#c49a37]/30 px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-sm text-right transition-colors ${
                  isActive 
                    ? 'bg-[#c49a37]/20 text-[#ffd875] font-bold border-r-4 border-[#c49a37]' 
                    : 'text-white/85 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="w-4 h-4 text-[#c49a37]" />}
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
          
          {!isInstalled && (
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  if (isIOS) {
                    alert('لتثبيت التطبيق على جهاز الآيفون:\nاضغط زر المشاركة (Share) في المتصفح ثم اختر "إضافة إلى الصفحة الرئيسية" (Add to Home Screen).');
                  } else {
                    installApp();
                  }
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#c49a37] text-[#08281c] font-bold text-sm"
              >
                <Download className="w-4 h-4" />
                <span>تثبيت الموقع كتطبيق على جهازك</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
