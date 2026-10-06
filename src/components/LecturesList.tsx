import React, { useState } from 'react';
import { Play, Clock, Radio, Search, Plus, CheckCircle2, Volume2, Pause, X } from 'lucide-react';
import { ALL_LECTURES, Lecture } from '../data/contentData';

export const LecturesList: React.FC = () => {
  const [lectures, setLectures] = useState<Lecture[]>(ALL_LECTURES);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLectureModal, setActiveLectureModal] = useState<Lecture | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New lecture form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('العقيدة والمنهج');
  const [newDuration, setNewDuration] = useState('40:00');
  const [newDescription, setNewDescription] = useState('');

  const categories = ['الكل', 'العقيدة والمنهج', 'التفسير والتدبر', 'الرقائق والتزكية', 'الفقه وأصوله'];

  const filteredLectures = lectures.filter((lec) => {
    const matchesCat = selectedCategory === 'الكل' || lec.category === selectedCategory;
    const matchesQuery = 
      lec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lec.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleAddLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newLec: Lecture = {
      id: `lecture-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      duration: newDuration.trim() || '45:00',
      date: '١٤٤٧ هـ',
      views: 1,
      description: newDescription.trim() || 'درس علمي مؤصل لفضيلة الشيخ الطيب مليط عكود.',
      keyPoints: ['تأصيل شرعي مستنبط من الكتاب والسنّة النبوية', 'فهم سلف الأمة في المسألة']
    };

    setLectures([newLec, ...lectures]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <section id="lectures-section" className="py-14 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-[#0b3827]/10 text-[#0b3827] mb-2 border border-[#0b3827]/20">
              <Radio className="w-3.5 h-3.5 text-[#c49a37]" />
              <span>المكتبة العلمية والصوتية</span>
            </div>
            <h2 className="font-amiri text-3xl font-bold text-[#08281c]">
              محاضرات ودروس الشيخ الطيب مليط عكود
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              سلسلة من الدروس التأصيلية والمواعظ الإيمانية في التفسير والحديث والعقيدة وترسيخ فقه التوسط والاعتدال.
            </p>
          </div>

          {/* Search box & Add button */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="بحث في الدروس والمحاضرات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-9 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-[#c49a37] focus:ring-1 focus:ring-[#c49a37]"
              />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#08281c] hover:bg-[#0c3827] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 shadow-xs"
              title="إضافة درس جديد للشيخ"
            >
              <Plus className="w-3.5 h-3.5 text-[#ffd875]" />
              <span>إضافة درس</span>
            </button>
          </div>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl mb-8 w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#08281c] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lectures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLectures.map((lecture) => (
            <div
              key={lecture.id}
              className="bg-[#fbfaf6] rounded-2xl border border-stone-200 hover:border-[#c49a37]/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group text-right"
            >
              <div className="p-5 space-y-3">
                
                {/* Meta line */}
                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                  <span className="text-[#08281c] font-semibold">{lecture.category}</span>
                  <span aria-hidden="true">·</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#c49a37]" />
                    <span>{lecture.duration}</span>
                  </div>
                  <span aria-hidden="true">·</span>
                  <span>{lecture.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-amiri text-xl font-bold text-[#08281c] group-hover:text-[#9e761d] transition-colors leading-snug line-clamp-2">
                  {lecture.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {lecture.description}
                </p>

                {/* Key Points snippet */}
                {lecture.keyPoints && (
                  <div className="pt-2 border-t border-stone-200/60 space-y-1">
                    <p className="text-[11px] font-bold text-stone-700">أهم محاور الدرس:</p>
                    <ul className="text-[11px] text-stone-500 space-y-0.5 list-disc list-inside">
                      {lecture.keyPoints.slice(0, 2).map((kp, i) => (
                        <li key={i} className="line-clamp-1">{kp}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Card Footer action button */}
              <div className="p-4 bg-stone-100/70 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => setActiveLectureModal(lecture)}
                  className="flex items-center gap-2 text-xs font-bold text-[#08281c] hover:text-[#9e761d] transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-[#08281c] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                  <span>استماع ومطالعة الدرس</span>
                </button>

                <span className="text-[11px] text-stone-400 font-mono">
                  {lecture.views.toLocaleString('ar-SA')} استماع
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing lecture details & audio player */}
        {activeLectureModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-[#c49a37]/30 text-right max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <button
                  onClick={() => setActiveLectureModal(null)}
                  className="text-stone-400 hover:text-stone-600 text-sm font-bold px-2 py-1"
                >
                  ✕ إغلاق
                </button>
                <span className="text-xs font-semibold text-[#08281c] bg-[#0b3827]/10 px-2.5 py-1 rounded">
                  {activeLectureModal.category}
                </span>
              </div>

              <h3 className="font-amiri text-2xl font-bold text-[#08281c]">
                {activeLectureModal.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span>المدة: {activeLectureModal.duration}</span>
                <span>·</span>
                <span>التاريخ: {activeLectureModal.date}</span>
                <span>·</span>
                <span>المحاضر: الشيخ الطيب مليط عكود</span>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed bg-[#fbfaf6] p-4 rounded-xl border border-stone-200">
                {activeLectureModal.description}
              </p>

              {activeLectureModal.quranVerses && (
                <div className="space-y-1.5 p-3 rounded-xl bg-[#08281c]/5 border border-[#c49a37]/30">
                  <p className="text-xs font-bold text-[#08281c]">الآيات القرآنية المركزية في الدرس:</p>
                  {activeLectureModal.quranVerses.map((v, i) => (
                    <div key={i} className="text-xs font-amiri text-[#08281c]">
                      «{v}»
                    </div>
                  ))}
                </div>
              )}

              {activeLectureModal.keyPoints && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-[#08281c]">عناصر ومحاور الدرس:</h4>
                  <div className="space-y-1.5">
                    {activeLectureModal.keyPoints.map((kp, i) => (
                      <div key={i} className="text-xs text-stone-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c49a37]" />
                        <span>{kp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Audio Player bar */}
              <div className="bg-[#08281c] text-white p-4 rounded-xl space-y-2">
                <p className="text-xs text-[#ffd875] font-semibold">المشغل الصوتي المباشر للدرس</p>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => {
                      if (isPlayingAudio === activeLectureModal.id) {
                        setIsPlayingAudio(null);
                      } else {
                        setIsPlayingAudio(activeLectureModal.id);
                      }
                    }}
                    className="w-9 h-9 rounded-full bg-[#c49a37] text-[#08281c] flex items-center justify-center font-bold shadow-md hover:scale-105 transition-transform"
                  >
                    {isPlayingAudio === activeLectureModal.id ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current translate-x-[-1px]" />
                    )}
                  </button>
                  <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className={`h-full bg-[#c49a37] ${isPlayingAudio === activeLectureModal.id ? 'w-1/2 animate-pulse' : 'w-1/4'}`} />
                  </div>
                  <span className="text-[11px] font-mono text-white/70">
                    {activeLectureModal.duration}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveLectureModal(null)}
                  className="px-5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold"
                >
                  إغلاق
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Modal for adding a new verified lesson */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-[#c49a37]/30 text-right">
              
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-stone-400 hover:text-stone-600 text-sm font-bold"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-amiri text-xl font-bold text-[#08281c]">
                  إضافة درس ومحاضرة جديدة
                </h3>
              </div>

              <form onSubmit={handleAddLecture} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">عنوان الدرس:</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="مثال: فقه التدبر في سورة الفاتحة..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#c49a37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">التصنيف:</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white focus:outline-none focus:border-[#c49a37]"
                    >
                      <option value="العقيدة والمنهج">العقيدة والمنهج</option>
                      <option value="التفسير والتدبر">التفسير والتدبر</option>
                      <option value="الرقائق والتزكية">الرقائق والتزكية</option>
                      <option value="الفقه وأصوله">الفقه وأصوله</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">مدة الدرس (دقيقة):</label>
                    <input
                      type="text"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      placeholder="45:00"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#c49a37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">نبذة وتفريغ الدرس:</label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="بيان موجز لمحاور الدرس وأهم الفوائد..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-[#c49a37]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-stone-100 text-stone-700 text-xs font-bold"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#08281c] text-white text-xs font-bold hover:bg-[#0c3827]"
                  >
                    حفظ ونشر الدرس
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
