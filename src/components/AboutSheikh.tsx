import React from 'react';
import { BookOpen, Compass, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SHEIKH_BIO } from '../data/contentData';

export const AboutSheikh: React.FC = () => {
  return (
    <section id="about-section" className="py-16 bg-[#fbf9f4] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Islamic Rosette & Credentials Card (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#c49a37]/30 to-[#0b3827]/20 rounded-3xl blur-md" />
              <div className="relative bg-[#062016] text-white p-6 rounded-2xl border border-[#c49a37]/40 shadow-xl overflow-hidden text-right">
                
                {/* Emblem */}
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#c49a37] to-[#08281c] p-0.5 shadow-lg flex items-center justify-center mb-6">
                  <div className="w-full h-full bg-[#08281c] rounded-[14px] flex items-center justify-center border border-[#c49a37]/40">
                    <Compass className="w-10 h-10 text-[#ffd875]" />
                  </div>
                </div>

                <h3 className="font-amiri text-2xl font-bold text-center text-white mb-1">
                  فضيلة الشيخ الطيب مليط عكود
                </h3>
                <p className="text-xs text-center text-[#c49a37] mb-6">
                  {SHEIKH_BIO.title}
                </p>

                <div className="space-y-3 pt-3 border-t border-white/10 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">الموطن:</span>
                    <strong className="text-white">{SHEIKH_BIO.country}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">المجال:</span>
                    <strong className="text-white">علوم القرآن والحديث والفقه</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">المنهج:</span>
                    <strong className="text-[#ffd875]">السنة النبوية والتوسط والاعتدال</strong>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bio text (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right order-1 lg:order-2">
            
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-[#0b3827]/10 text-[#0b3827] border border-[#0b3827]/20">
              <Compass className="w-3.5 h-3.5 text-[#c49a37]" />
              <span>ترجمة موجزة وسيرة علمية</span>
            </div>

            <h2 className="font-amiri text-3xl sm:text-4xl font-bold text-[#08281c] leading-tight">
              فضيلة الشيخ الطيب مليط عكود
            </h2>

            <p className="text-base text-stone-700 leading-relaxed font-normal">
              {SHEIKH_BIO.about}
            </p>

            {/* Principles */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-[#08281c]">مرتكزات المنهج الدعوي والعلمي للشيخ:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
                {SHEIKH_BIO.credentials.map((cred, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-stone-200 flex items-start gap-2.5 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#c49a37] shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-medium">{cred}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote block */}
            <div className="bg-[#08281c] text-white p-5 rounded-2xl border border-[#c49a37]/40 shadow-lg relative overflow-hidden">
              <p className="font-amiri text-base italic text-[#ebd9b2] leading-relaxed relative z-10">
                «إن حاجة أمتنا اليوم إلى فقه التوسط والرحمة أشد من حاجتها إلى مجرد تكثير الأقوال؛ فإذا عاد الناس إلى تدبر القرآن وهدي سيد الأنام عليه الصلاة والسلام صفت القلوب واعتدلت المسالك.»
              </p>
              <div className="mt-2 text-left text-xs text-[#ffd875] font-semibold">
                — الشيخ الطيب مليط عكود
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
