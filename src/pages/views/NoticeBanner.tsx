import { useState } from 'react';
import { Megaphone, X } from 'lucide-react';

import { NOTICES } from '@/common/const';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    <div className="shrink-0 px-4 md:px-6 pt-4 space-y-2">
      {notices.map((notice) => {
        const isLong = notice.content.length > TRUNCATE_LENGTH;
        const isExpanded = expandedIds.includes(notice.id);

        return (
          <div
            key={notice.id}
            className="relative flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3"
          >
            <Megaphone className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              {isExpanded ? (
                <ScrollArea className="max-h-56 h-56 pr-2" hideScrollbar>
                  <p className="text-sm text-blue-900 break-words whitespace-pre-line">
                    {notice.content}
                  </p>
                </ScrollArea>
              ) : (
                <p
                  className={`text-sm text-blue-900 break-words whitespace-pre-line ${
                    isLong ? 'line-clamp-2' : ''
                  }`}
                >
                  {notice.content}
                </p>
              )}
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-blue-500">{notice.date}</p>
                {isLong && (
                  <button
                    onClick={() => toggleExpand(notice.id)}
                    className="text-xs text-blue-600 hover:text-blue-800 underline"
                  >
                    {isExpanded ? '접기' : '더보기'}
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDismiss(notice.id)}
              className="absolute top-3 right-3 text-blue-400 hover:text-blue-600 shrink-0 cursor-pointer"
              aria-label="공지 닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default NoticeBanner;
