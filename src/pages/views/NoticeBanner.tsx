import { useState } from 'react';
import { Megaphone, X } from 'lucide-react';

import { NOTICES } from '@/common/const';

const TRUNCATE_LENGTH = 60;

function NoticeBanner() {
  const [dismissedIds, setDismissedIds] = useState<number[]>([]);
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const handleDismiss = (id: number) => {
    setDismissedIds((prev) => [...prev, id]);
  };

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((expandedId) => expandedId !== id) : [...prev, id]
    );
  };

  const notices = NOTICES.filter((notice) => !dismissedIds.includes(notice.id));

  if (notices.length === 0) return null;

  return (
    <div className="shrink-0 px-4 md:px-6 pt-3 space-y-2">
      {notices.map((notice) => {
        const isLong = notice.content.length > TRUNCATE_LENGTH;
        const isExpanded = expandedIds.includes(notice.id);

        return (
          <div
            key={notice.id}
            className="relative flex items-start gap-3 bg-white/90 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-[0_2px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-200"
          >
            <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
              <Megaphone className="w-3.5 h-3.5" />
            </div>

            <div className="flex-1 min-w-0 pr-6">
              {isExpanded ? (
                <div className="max-h-52 overflow-y-auto pr-2">
                  <p className="text-xs text-gray-800 break-words whitespace-pre-line leading-relaxed">
                    {notice.content}
                  </p>
                </div>
              ) : (
                <p
                  className={`text-xs text-gray-800 break-words whitespace-pre-line leading-relaxed ${
                    isLong ? 'line-clamp-2' : ''
                  }`}
                >
                  {notice.content}
                </p>
              )}

              <div className="flex items-center gap-3 mt-1.5">
                <span className="text-[10px] font-mono text-gray-400">{notice.date}</span>
                {isLong && (
                  <button
                    onClick={() => toggleExpand(notice.id)}
                    className="text-[11px] font-semibold text-[#0071E3] hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    {isExpanded ? '간략히 보기' : '자세히 보기'}
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={() => handleDismiss(notice.id)}
              className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-gray-300 hover:text-gray-600 hover:bg-black/[0.04] transition-colors cursor-pointer"
              aria-label="공지 닫기"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default NoticeBanner;
