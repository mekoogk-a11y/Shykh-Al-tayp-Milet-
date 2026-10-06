import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Mail, Phone, MapPin, X } from 'lucide-react';

interface ContactFatwaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactFatwaModal: React.FC<ContactFatwaModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('سؤال شرعي أو فتوى');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#c49a37]/40 text-right relative">
        
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-sm font-bold"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="font-amiri text-2xl font-bold text-[#08281c]">
            تواصل واستفسار علمي
          </h3>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-amiri text-xl font-bold text-[#08281c]">
              تم إرسال رسالتكم بنجاح
            </h4>
            <p className="text-xs text-stone-600">
              شكر الله لكم، سيتم مراجعة استفساركم وعرضه على فضيلة الشيخ الطيب مليط عكود ومكتبه العلمي.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-stone-600 leading-relaxed">
              يسعدنا استقبال أسئلتكم واستفساراتكم الشرعية ودعوات الدروس والمحاضرات ليتم إحالتها إلى المكتب العلمي لفضيلة الشيخ.
            </p>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">الاسم الكريم:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="أدخل اسمك الكريم"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#c49a37] focus:ring-1 focus:ring-[#c49a37]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">البريد الإلكتروني أو الهاتف:</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="للرد على استفساركم"
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#c49a37] focus:ring-1 focus:ring-[#c49a37]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">نوع الطلب:</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#c49a37] focus:ring-1 focus:ring-[#c49a37] bg-white"
              >
                <option value="سؤال شرعي أو فتوى">سؤال شرعي أو فتوى</option>
                <option value="استفسار حول بحث علمي">استفسار حول بحث علمي</option>
                <option value="دعوة لإلقاء محاضرة أو ندوة">دعوة لإلقاء محاضرة أو ندوة</option>
                <option value="اقتراح أو كلمة شكر">اقتراح أو كلمة شكر</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 block">نص السؤال أو الرسالة:</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب استفسارك بالتفصيل..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#c49a37] focus:ring-1 focus:ring-[#c49a37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#08281c] to-[#0d3b2a] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-[#ffd875]" />
              <span>إرسال الاستفسار للمكتب العلمي</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
