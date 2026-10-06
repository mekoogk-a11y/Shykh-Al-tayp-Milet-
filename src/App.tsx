import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LecturesList } from './components/LecturesList';
import { ResearchesSection } from './components/ResearchesSection';
import { AboutSheikh } from './components/AboutSheikh';
import { ContactFatwaModal } from './components/ContactFatwaModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { Footer } from './components/Footer';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from './hooks/usePWAInstall';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showPwaBanner, setShowPwaBanner] = useState(true);

  const { isInstalled, isIOS, installApp } = usePWAInstall();

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f4] text-[#1c2923] font-cairo">
      
      {/* Global Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'contact') {
            setIsContactOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Top PWA Install Banner */}
      {!isInstalled && showPwaBanner && (
        <div className="bg-[#0b3827] text-white px-4 py-2.5 border-b border-[#c49a37]/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 max-w-xl text-right">
            <Smartphone className="w-4 h-4 text-[#ffd875] shrink-0" />
            <span>
              يمكنك الآن تنزيل وتثبيت موقع الشيخ الطيب مليط عكود كتطبيق على هاتفك أو حاسوبك للوصول السريع بدون متصفح.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isIOS) {
                  alert('لتثبيت التطبيق على جهازك:\nاضغط زر المشاركة (Share) في المتصفح ثم اختر "إضافة إلى الصفحة الرئيسية" (Add to Home Screen).');
                } else {
                  installApp();
                }
              }}
              className="bg-[#c49a37] hover:bg-[#d8aa3d] text-[#08281c] font-bold px-3 py-1 rounded-md text-[11px] shadow-sm transition-colors flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>تثبيت التطبيق الآن</span>
            </button>

            <button
              onClick={() => setShowPwaBanner(false)}
              className="text-white/60 hover:text-white p-1"
              aria-label="إغلاق التنبيه"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area based on Active Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onGoToResearches={() => {
                setActiveTab('researches');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onGoToLectures={() => {
                setActiveTab('lectures');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Complete Lectures & Lessons Catalog */}
            <LecturesList />

            {/* Researches Section */}
            <ResearchesSection />

            {/* About the Sheikh Section */}
            <AboutSheikh />
          </>
        )}

        {activeTab === 'lectures' && (
          <div>
            <LecturesList />
          </div>
        )}

        {activeTab === 'researches' && (
          <div>
            <ResearchesSection />
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <AboutSheikh />
          </div>
        )}
      </main>

      {/* Modals */}
      <ContactFatwaModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLecture={() => {
          setActiveTab('lectures');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={(tab) => {
          if (tab === 'contact') {
            setIsContactOpen(true);
          } else {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

    </div>
  );
}
