import { useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

import { WEBSITES } from "@/common/const";
import { ScrollArea } from "@/components/ui/scroll-area";

function ArchivePage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? WEBSITES.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === WEBSITES.length - 1 ? 0 : prev + 1));
  };

  const currentSite = WEBSITES[currentIndex];
  return (
    <ScrollArea className="h-full">
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center mb-2">
          <div className="text-3xl text-gray-900 mb-4">사이트 아카이브</div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            학교 관련 주요 웹사이트들을 한눈에 확인하세요.
          </p>
        </div>

        {/* Site List - Desktop View */}
        <div className="mt-12 hidden md:block mb-12">
          <div className="text-xl text-gray-900 mb-4">전체 사이트 목록</div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {WEBSITES.map((site, index) => (
              <button
                key={site.id}
                onClick={() => setCurrentIndex(index)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  index === currentIndex
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <p className="text-sm text-gray-900 mb-1">{site.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Card Carousel */}
        <div className="relative">
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
            <div className="flex flex-col md:flex-row">
              {/* 왼쪽 이미지 */}
              <div className="md:w-72 md:flex-shrink-0 h-48 overflow-hidden bg-gray-200">
                {currentSite.image && (
                  <img
                    src={currentSite.image}
                    alt={currentSite.name}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
              </div>

              {/* 오른쪽 콘텐츠 */}
              <div className="p-6 flex-1">
                <div className="text-xl text-gray-900 mb-2">{currentSite.name}</div>
                <p className="text-gray-600 mb-4 text-sm">{currentSite.description}</p>
                
                <div className="flex items-center gap-2 flex-wrap">
                  {currentSite.url && (
                    <a
                      href={currentSite.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      사이트 방문
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {currentSite.subUrl && (
                    <a
                      href={currentSite.subUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                    >
                      관련 게시글
                      <FileText className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {WEBSITES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

export default ArchivePage;