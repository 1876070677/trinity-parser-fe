import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/common/const';

function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4 p-1 pr-3">
      <div className="space-y-2">
        {FAQS.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <p className="text-gray-900">{faq.question}</p>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-2 ${
                  openId === index ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {openId === index && (
              <div className="px-4 pb-4 pt-0">
                <p className="text-gray-700 bg-gray-50 p-3 rounded">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;