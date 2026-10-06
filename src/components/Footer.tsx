import React, { useState } from 'react';
import { Compass, Mail, Check, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const { isInstalled, isIOS, installApp } = usePWAInstall();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-[#051c14] border-t-2 border-[#c49a37]/40 text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10 text-right">
          
          {/* Identity & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#c49a37] p-0.5 shadow-md flex items-center justify-center text-[#08281c]">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-amiri text-xl font-bold text-white">
                  الشيخ الطيب مليط عكود
                </h3>
                <p className="text-[11px] text-[#c49a37] font-medium">
                  المنصة العلمية والدعوية الرسمية
                </p>
              </div>
            </div>

            <p className="text-xs text-white/70 leading-relaxed font-light max-w-md">
              منصة مباركة تُعنى بنشر العلم الشرعي الأصيل على منهج أهل السنة والجماعة، 
              وترسيخ مبادئ التوسط والاعتدال ومحاربة التشدد والغلو، بإشراف المكتب العلمي لفضيلة الشيخ.
            </p>

            {!isInstalled && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (isIOS) {
                      alert('لتثبيت التطبيق على جهازك:\nاضغط زر المشاركة (Share) في المتصفح ثم اختر "إضافة إلى الصفحة الرئيسية" (Add to Home Screen).');
                    } else {
                      installApp();
                    }
                  }}
                  className="inline-flex items-center gap-2 bg-[#c49a37] hover:bg-[#d4aa3f] text-[#08281c] px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>تثبيت المنصة كتطبيق على جهازك</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-amiri text-base font-bold text-[#ffd875] border-b border-white/10 pb-2">
              أقسام المنصة
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#ffd875] transition-colors">
                  الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lectures')} className="hover:text-[#ffd875] transition-colors">
                  محاضرات ودروس الشيخ
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('researches')} className="hover:text-[#ffd875] transition-colors">
                  بحوث ودراسات علمية محكمة
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#ffd875] transition-colors">
                  سيرة الشيخ ومنهجه
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#ffd875] transition-colors">
                  طلب فتوى أو استفسار علمي
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Box (4 cols) */}
          <div className="lg:col-span-4 space-y-3 bg-[#08281c] p-5 rounded-2xl border border-[#c49a37]/30">
            <div className="flex items-center gap-2 text-[#ffd875] text-xs font-bold">
              <Mail className="w-4 h-4" />
              <span>متابعة جديد الدروس والبحوث</span>
            </div>
            <p className="text-[11px] text-white/70 leading-relaxed">
              اشترك ليصلك إشعار فوري عند صدور درس جديد أو بحث علمي محكم للشيخ الطيب مليط عكود.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>تم اشتراككم بنجاح، جزاكم الله خيراً!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="بريدك الإلكتروني..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#c49a37]"
                />
                <button
                  type="submit"
                  className="bg-[#c49a37] hover:bg-[#d4aa3f] text-[#08281c] font-bold text-xs px-3.5 py-2 rounded-xl transition-colors shrink-0"
                >
                  اشتراك
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-3">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} للمنصة العلمية الرسمية للشيخ الطيب مليط عكود.
          </p>
          <div className="flex items-center gap-1 text-[11px] text-[#ffd875]">
            <span>وقف علمي لدعوة التوسط والاعتدال</span>
            <span aria-hidden="true">·</span>
            <span>صدقة جارية</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
