import React, { useState } from 'react';
import { Search, X, Radio, BookOpen, ArrowLeft } from 'lucide-react';
import { ALL_LECTURES, RESEARCH_PAPERS, Lecture, ResearchPaper } from '../data/contentData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLecture: (lec: Lecture) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectLecture,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const matchedLectures = query.trim()
    ? ALL_LECTURES.filter(
        (l) =>
          l.title.toLowerCase().includes(query.toLowerCase()) ||
          l.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const matchedResearches = query.trim()
    ? RESEARCH_PAPERS.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.abstract.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const totalResults = matchedLectures.length + matchedResearches.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/70 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#c49a37]/30 text-right space-y-4 max-h-[80vh] flex flex-col">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3">
          <Search className="w-5 h-5 text-[#c49a37]" />
          <input
            type="text"
            autoFocus
            placeholder="ابحث في محاضرات، ودروس، وبحوث الشيخ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm font-medium focus:outline-none placeholder:text-stone-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-600 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto flex-1 divide-y divide-stone-100 pr-1 space-y-4">
          {query.trim() === '' ? (
            <div className="py-12 text-center text-xs text-stone-400 space-y-2">
              <p>جرّب البحث عن: «التدبر»، «الغلو»، «النفر الثلاثة»، «سفيان الثوري»، «صيام داود»</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-xs text-stone-500">
              لم نجد نتائج مطابقة لبحثكم. جرّب كلمات بحث أخرى.
            </div>
          ) : (
            <div className="space-y-4 pt-2">
              
              {/* Lectures */}
              {matchedLectures.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#c49a37] block">المحاضرات والدروس العلمية:</span>
                  {matchedLectures.map((lec) => (
                    <div
                      key={lec.id}
                      onClick={() => {
                        onSelectLecture(lec);
                        onClose();
                      }}
                      className="p-3 rounded-xl bg-stone-50 hover:bg-[#08281c] hover:text-white cursor-pointer transition-colors group flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-[#c49a37] shrink-0" />
                        <div>
                          <p className="text-xs font-bold font-amiri text-stone-900 group-hover:text-white">
                            {lec.title}
                          </p>
                          <span className="text-[11px] text-stone-500 group-hover:text-white/70">
                            {lec.category} · {lec.duration}
                          </span>
                        </div>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-stone-400 group-hover:text-[#ffd875]" />
                    </div>
                  ))}
                </div>
              )}

              {/* Researches */}
              {matchedResearches.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-[#c49a37] block">البحوث والدراسات العلمية:</span>
                  {matchedResearches.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#c49a37] shrink-0" />
                        <div>
                          <p className="text-xs font-bold font-amiri text-stone-900">
                            {res.title}
                          </p>
                          <span className="text-[11px] text-stone-500">
                            {res.field} · {res.pages} صفحة
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
