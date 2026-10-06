import React, { useState } from 'react';
import { BookOpen, FileDown, Check, Bookmark, Share2, Layers, Search, BookMarked, Quote } from 'lucide-react';
import { RESEARCH_PAPERS, ResearchPaper } from '../data/contentData';

export const ResearchesSection: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleCopyCitation = (paper: ResearchPaper) => {
    const citation = `عكود، الطيب مليط. (${paper.year.includes('٢٠٢٤') ? '2024' : '2023'}). ${paper.title}. المنصة العلمية والدعوية للشيخ الطيب مليط عكود.`;
    navigator.clipboard?.writeText(citation);
    setCopiedCitation(paper.id);
    setTimeout(() => setCopiedCitation(null), 2500);
  };

  const handleDownloadPDF = (paper: ResearchPaper) => {
    const content = `
بحث علمي محكم
فضيلة الشيخ الطيب مليط عكود
العنوان: ${paper.title}
المجال العلمي: ${paper.field}
السنة: ${paper.year}
عدد الصفحات: ${paper.pages}

المستخلص العلمي:
${paper.abstract}

فهرس المباحث والمحتويات:
${paper.toc.map((t, i) => `${i + 1}. ${t}`).join('\n')}

أهم النتائج والتوصيات الفقهية:
${paper.keyConclusions.map((c, i) => `${i + 1}. ${c}`).join('\n')}

مقدمة البحث:
${paper.fullTextPreview}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `بحث-${paper.title.replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(paper.id);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <section id="researches-section" className="py-14 bg-[#fbf9f4] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10 text-right">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-[#0b3827]/10 text-[#0b3827] mb-2 border border-[#0b3827]/20">
            <BookOpen className="w-3.5 h-3.5 text-[#c49a37]" />
            <span>الدراسات الفقهية والتأصيلية</span>
          </div>
          <h2 className="font-amiri text-3xl font-bold text-[#08281c]">
            بحوث ودراسات الشيخ الطيب مليط عكود
          </h2>
          <p className="text-stone-600 text-sm mt-1 leading-relaxed">
            مجموعة من الأبحاث المحكمة والأوراق العلمية التي تتناول قضايا التوسط، تدبر القرآن، ومقاصد الشريعة، ونقد مقالات الغلو والتشدد.
          </p>
        </div>

        {/* Papers Grid */}
        <div className="space-y-6">
          {RESEARCH_PAPERS.map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-2xl border border-stone-200 hover:border-[#c49a37]/60 shadow-xs hover:shadow-md transition-all p-6 text-right"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                
                {/* Paper Info */}
                <div className="flex-1 space-y-3">
                  
                  {/* Metadata (Clean unboxed line as per constitution) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 font-medium">
                    <span className="text-[#08281c] font-semibold">{paper.field}</span>
                    <span aria-hidden="true">·</span>
                    <span>{paper.pages} صفحة</span>
                    <span aria-hidden="true">·</span>
                    <span>{paper.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{paper.downloadsCount.toLocaleString('ar-SA')} تحميل</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-amiri text-2xl font-bold text-[#08281c] leading-snug">
                    {paper.title}
                  </h3>

                  {/* Abstract */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {paper.abstract}
                  </p>

                  {/* Keywords */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-stone-400 font-medium">الكلمات المفتاحية:</span>
                    {paper.keywords.map((kw, idx) => (
                      <span key={idx} className="text-[11px] text-[#08281c] bg-stone-100 px-2 py-0.5 rounded">
                        #{kw}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Paper Side Actions */}
                <div className="flex flex-row lg:flex-col items-center gap-2 shrink-0 border-t lg:border-t-0 lg:border-r border-stone-100 pt-4 lg:pt-0 lg:pr-6">
                  
                  <button
                    onClick={() => setSelectedPaper(paper)}
                    className="flex-1 lg:w-44 py-2.5 px-4 rounded-xl bg-[#08281c] hover:bg-[#0c3827] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-[#ffd875]" />
                    <span>قراءة البحث وفهرسه</span>
                  </button>

                  <button
                    onClick={() => handleDownloadPDF(paper)}
                    className="flex-1 lg:w-44 py-2.5 px-4 rounded-xl bg-[#f8f5ee] hover:bg-[#f1ece1] text-[#08281c] border border-stone-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    {downloadSuccess === paper.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>تم التحميل</span>
                      </>
                    ) : (
                      <>
                        <FileDown className="w-4 h-4 text-[#c49a37]" />
                        <span>تحميل البحث (PDF)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleCopyCitation(paper)}
                    className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1 py-1"
                    title="نسخ التوثيق العلمي"
                  >
                    {copiedCitation === paper.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Quote className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedCitation === paper.id ? 'تم نسخ التوثيق' : 'نسخ الإحالة العلمية'}</span>
                  </button>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Paper Reader Modal */}
        {selectedPaper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#c49a37]/40 text-right max-h-[92vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="text-stone-400 hover:text-stone-700 text-sm font-bold px-2 py-1"
                >
                  ✕ إغلاق
                </button>
                <div className="text-xs text-stone-500">
                  <span>{selectedPaper.field}</span>
                  <span className="mx-2">·</span>
                  <span>{selectedPaper.pages} صفحة</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs text-[#c49a37] font-semibold">بحث مؤصل لفضيلة الشيخ الطيب مليط عكود</span>
                <h3 className="font-amiri text-2xl sm:text-3xl font-bold text-[#08281c] leading-snug">
                  {selectedPaper.title}
                </h3>
              </div>

              {/* Table of Contents */}
              <div className="p-4 bg-[#fbfaf6] rounded-xl border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold text-[#08281c] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#c49a37]" />
                  <span>فهرس المباحث والمطالب:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {selectedPaper.toc.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c49a37] shrink-0" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Conclusions */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#08281c]">أهم النتائج والتأصيلات المستنبطة من البحث:</h4>
                <div className="space-y-2">
                  {selectedPaper.keyConclusions.map((conc, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-900/10 text-xs text-stone-800 leading-relaxed font-medium">
                      {conc}
                    </div>
                  ))}
                </div>
              </div>

              {/* Text Preview */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#08281c]">مقدمة البحث:</h4>
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm font-amiri leading-relaxed text-stone-700">
                  {selectedPaper.fullTextPreview}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200">
                <button
                  onClick={() => handleCopyCitation(selectedPaper)}
                  className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1.5 font-medium"
                >
                  <Quote className="w-3.5 h-3.5 text-[#c49a37]" />
                  <span>نسخ الإحالة العلمية للبحث</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadPDF(selectedPaper)}
                    className="px-4 py-2 rounded-xl bg-[#08281c] text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <FileDown className="w-4 h-4 text-[#ffd875]" />
                    <span>تحميل النص الكامل</span>
                  </button>
                  <button
                    onClick={() => setSelectedPaper(null)}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold"
                  >
                    إغلاق
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
