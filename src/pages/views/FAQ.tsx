import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/common/const';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="space-y-3 p-1 pr-2">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-2xl transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white shadow-xs border border-gray-200/80'
                : 'bg-sub-background border border-black/[0.04] hover:bg-white shadow-2xs'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5 flex-1 pr-2">
                <span className="text-xs font-mono font-bold text-gray-700 bg-white px-2 py-0.5 rounded-md border border-gray-200/60 shadow-2xs">
                  Q{index + 1}
                </span>
                <p className="text-xs font-bold text-gray-900 leading-snug">
                  {faq.question}
                </p>
              </div>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-500 bg-white border border-gray-200/60 shadow-2xs shrink-0">
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isOpen ? 'transform rotate-180 text-gray-900' : ''
                  }`}
                />
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                <p className="text-xs text-gray-700 leading-relaxed break-words whitespace-pre-line bg-sub-background p-3.5 rounded-xl font-medium">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
