import { useState } from 'react';
import { BookOpen, Award, MessageSquare, HelpCircle } from 'lucide-react';

import CourseList from '@/pages/views/CourseList';
import Grades from '@/pages/views/Grades';
import Guestbook from '@/pages/views/Guestbook';
import FAQ from '@/pages/views/FAQ';
import NoticeBanner from '@/pages/views/NoticeBanner';

const TABS = [
  { id: 'courses', label: '수강 과목', icon: BookOpen },
  { id: 'grades', label: '성적', icon: Award },
  { id: 'guestbook', label: '방명록', icon: MessageSquare },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

function DashboardPage() {
  // state.
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="flex-1 flex flex-col bg-main-background">
      <NoticeBanner />

      {/* Mobile Tab Bar */}
      <nav className="md:hidden shrink-0 px-4 pt-2">
        <div className="bg-white/80 backdrop-blur-xl p-1.5 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex gap-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-black/[0.03]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[11px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Content */}
      <div className="md:hidden flex-1 overflow-y-auto px-4 py-4">
        <div className="bg-white rounded-3xl p-5 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          {activeTab === 'courses' && <CourseList />}
          {activeTab === 'grades' && <Grades />}
          {activeTab === 'guestbook' && <Guestbook />}
          {activeTab === 'faq' && <FAQ />}
        </div>
      </div>

      {/* Desktop 2-Column Layout (Left: Courses/Grades + FAQ, Right: Guestbook) */}
      <div className="hidden md:grid grid-cols-[2fr_1fr] max-w-7xl mx-auto px-6 py-6 w-full gap-5 items-stretch">
        {/* Left Column (2/3 width): Determines total height */}
        <div className="flex flex-col gap-5 min-w-0">
          {/* Top Row: Courses & Grades */}
          <div className="grid grid-cols-2 gap-5 h-[500px]">
            {/* Courses Section */}
            <div className="bg-white rounded-3xl p-6 min-h-0 h-full overflow-hidden flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-gray-900 tracking-tight">수강 과목</h2>
                </div>
                <span className="text-[11px] font-medium text-gray-500 bg-gray-100/70 px-2.5 py-0.5 rounded-full">
                  실시간 잔여석
                </span>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                <CourseList />
              </div>
            </div>

            {/* Grades Section */}
            <div className="bg-white rounded-3xl p-6 min-h-0 h-full overflow-hidden flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h2 className="text-base font-bold text-gray-900 tracking-tight">성적 조회</h2>
                </div>
                <span className="text-[11px] font-medium text-gray-500 bg-gray-100/70 px-2.5 py-0.5 rounded-full">
                  학기별
                </span>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto pr-1">
                <Grades />
              </div>
            </div>
          </div>

          {/* Bottom Row: FAQ Section (Natural height, no inner scroll, all 5 items visible) */}
          <div className="bg-white rounded-3xl p-6 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-gray-900 tracking-tight">자주 묻는 질문 (FAQ)</h2>
              </div>
              <span className="text-[11px] font-medium text-gray-500 bg-gray-100/70 px-2.5 py-0.5 rounded-full">
                수강신청 안내
              </span>
            </div>
            <div>
              <FAQ />
            </div>
          </div>
        </div>

        {/* Right Column (1/3 width): Relative container with absolute inset-0 Guestbook card */}
        <div className="relative w-full h-full min-h-0 min-w-0">
          <div className="absolute inset-0 bg-white rounded-3xl p-6 overflow-hidden flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
            <div className="flex items-center justify-between mb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-gray-900 tracking-tight">방명록</h2>
              </div>
              <span className="text-[11px] font-medium text-gray-500 bg-gray-100/70 px-2.5 py-0.5 rounded-full">
                커뮤니티
              </span>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
              <Guestbook />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;