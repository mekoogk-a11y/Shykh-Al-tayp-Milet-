import React from 'react';
import { BookOpen, ShieldCheck, Download, CheckCircle2, Radio, Compass, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeroProps {
  onGoToResearches: () => void;
  onGoToLectures: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onGoToResearches,
  onGoToLectures,
}) => {
  const { isInstalled, isIOS, installApp } = usePWAInstall();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#08281c] via-[#0d3b2a] to-[#08281c] text-white pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#c49a37]/30">
      {/* Decorative Islamic geometric patterns & warm gold glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c49a37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#c49a37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#16563e]/40 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-6 text-right">
            
            {/* Elegant scholarly kicker tag */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-md bg-[#c49a37]/15 text-[#ffd875] border border-[#c49a37]/30">
              <ShieldCheck className="w-4 h-4 text-[#c49a37]" />
              <span>المنصة العلمية والدعوية الرسمية</span>
              <span aria-hidden="true">·</span>
              <span>فقه التوسط والاعتدال</span>
            </div>

            <h1 className="font-amiri text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              موقع فضيلة الشيخ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#ffd875] via-[#e2be5f] to-[#ffffff]">
                الطيب مليط عكود
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed font-light max-w-2xl">
              منصة علمية وتأصيلية تُعنى بنشر هدي القرآن العظيم والسنّة النبوية المطهرة بفهم سلف الأمة الصالح، 
              وترسيخ معالم <strong className="text-[#ffd875] font-semibold">التوسط والاعتدال</strong> ومحاربة نزعات الغلو والتشدد، 
              وتقديم زاد إيماني متين لطلاب العلم وعموم المسلمين.
            </p>

            {/* Quote banner */}
            <div className="bg-[#051c14]/90 border-r-4 border-[#c49a37] p-4 rounded-l-xl text-sm italic text-[#ebd9b2] font-amiri leading-relaxed shadow-lg max-w-2xl">
              «دين الإسلام دين الوسطية والرحمة، وما دخل الغلو والتشدد في عبادة إلا أفسد لذتها، وهدي النبي ﷺ هو الميزان الحق.»
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onGoToLectures}
                className="flex items-center gap-2.5 bg-gradient-to-r from-[#c49a37] via-[#dfb64e] to-[#b38622] hover:brightness-110 active:scale-95 text-[#08281c] font-bold px-6 py-3.5 rounded-xl shadow-xl transition-all text-sm group"
              >
                <Radio className="w-4 h-4" />
                <span>محاضرات ودروس الشيخ</span>
              </button>

              <button
                onClick={onGoToResearches}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-5 py-3.5 rounded-xl border border-white/20 transition-all text-sm"
              >
                <BookOpen className="w-4 h-4 text-[#ffd875]" />
                <span>بحوث الشيخ المحكمة</span>
              </button>

              {/* Install PWA Button directly in Hero */}
              {!isInstalled && (
                <button
                  onClick={() => {
                    if (isIOS) {
                      alert('لتثبيت التطبيق على جهازك:\nاضغط على أيقونة المشاركة (Share) في المتصفح ثم اختر "إضافة إلى الصفحة الرئيسية" (Add to Home Screen).');
                    } else {
                      installApp();
                    }
                  }}
                  className="flex items-center gap-2 bg-[#0d4a34] hover:bg-[#12583f] text-[#ffd875] font-semibold px-4 py-3.5 rounded-xl border border-[#c49a37]/40 transition-all text-sm"
                >
                  <Download className="w-4 h-4 text-[#ffd875]" />
                  <span>تثبيت الموقع كتطبيق</span>
                </button>
              )}
            </div>

            {/* Quick badges */}
            <div className="pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-white/75">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c49a37] shrink-0" />
                <span>محاضرات ودروس مؤصلة</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c49a37] shrink-0" />
                <span>بحوث فقهية محكمة</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c49a37] shrink-0" />
                <span>تطبيق خفيف وسريع</span>
              </div>
            </div>
          </div>

          {/* Right/Side Card: Pure Islamic Calligraphic & Geometric Emblem (NO photos of people) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-sm bg-[#062016] rounded-2xl border border-[#c49a37]/40 shadow-2xl p-6 text-right space-y-6">
              
              {/* Geometric Emblem */}
              <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-[#c49a37] via-[#9e761d] to-[#0b3827] p-0.5 shadow-xl flex items-center justify-center">
                <div className="w-full h-full bg-[#08281c] rounded-[14px] flex items-center justify-center border border-[#c49a37]/40">
                  <Compass className="w-12 h-12 text-[#ffd875]" />
                </div>
              </div>

              <div className="text-center space-y-1.5">
                <h3 className="font-amiri text-2xl font-bold text-white">
                  فضيلة الشيخ الطيب مليط عكود
                </h3>
                <p className="text-xs text-[#dfb64e]">
                  المنصة العلمية والدعوية الرسمية
                </p>
                <div className="text-[11px] font-amiri text-[#e0cfab] pt-1">
                  «طلب العلم فريضة على كل مسلم»
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-2 text-center py-2.5 bg-[#093022] rounded-xl border border-white/5">
                <div>
                  <p className="text-xl font-bold font-amiri text-[#ffd875]">١٤٠+</p>
                  <p className="text-[11px] text-white/70">محاضرة ودرس</p>
                </div>
                <div className="border-r border-white/10">
                  <p className="text-xl font-bold font-amiri text-[#ffd875]">١٨</p>
                  <p className="text-[11px] text-white/70">بحثاً ودراسة</p>
                </div>
              </div>

              {/* Quick Jump Action */}
              <button 
                onClick={onGoToLectures}
                className="w-full bg-gradient-to-r from-[#0c3c2b] to-[#124d38] hover:from-[#114b36] hover:to-[#175d44] p-3 rounded-xl border border-[#c49a37]/30 flex items-center justify-between transition-colors group text-right"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#c49a37] text-[#08281c] flex items-center justify-center shadow-md">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#ffd875] font-semibold">مكتبة الدروس</p>
                    <p className="text-[11px] text-white/80">تصفح جميع الدروس العلمية</p>
                  </div>
                </div>
                <span className="text-xs text-[#c49a37] font-semibold group-hover:translate-x-[-3px] transition-transform">
                  استماع ←
                </span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
