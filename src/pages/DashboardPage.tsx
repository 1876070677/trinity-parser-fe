import { useState, type ComponentType, type ReactNode } from 'react';
import { BookOpen, Award, MessageSquare, HelpCircle, type LucideProps } from 'lucide-react';

import CourseList from '@/pages/views/CourseList';
import Grades from '@/pages/views/Grades';
import Guestbook from '@/pages/views/Guestbook';
import FAQ from '@/pages/views/FAQ';
import NoticeBanner from '@/pages/views/NoticeBanner';
import { cn } from '@/lib/utils';

type TabId = 'courses' | 'grades' | 'guestbook' | 'faq';

const TABS: { id: TabId; label: string; icon: ComponentType<LucideProps>; view: ReactNode }[] = [
  { id: 'courses', label: '수강 과목', icon: BookOpen, view: <CourseList /> },
  { id: 'grades', label: '성적', icon: Award, view: <Grades /> },
  { id: 'guestbook', label: '방명록', icon: MessageSquare, view: <Guestbook /> },
  { id: 'faq', label: 'FAQ', icon: HelpCircle, view: <FAQ /> },
];

const CARD_BASE =
  'bg-white rounded-3xl p-6 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300';

interface SectionCardProps {
  icon: ComponentType<LucideProps>;
  title: string;
  badge: string;
  /** 카드 래퍼에 추가되는 레이아웃 클래스 (높이/오버플로 정책은 카드마다 다르다) */
  className?: string;
  /** 본문 래퍼 클래스. 스크롤 정책이 카드마다 달라 호출부에서 정한다 */
  bodyClassName?: string;
  children: ReactNode;
}

function SectionCard({ icon: Icon, title, badge, className, bodyClassName, children }: SectionCardProps) {
  return (
    <div className={cn(CARD_BASE, className)}>
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
            <Icon className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-gray-900 tracking-tight">{title}</h2>
        </div>
        <span className="text-[11px] font-medium text-gray-500 bg-gray-100/70 px-2.5 py-0.5 rounded-full">
          {badge}
        </span>
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

function DashboardPage() {
  // state.
  const [activeTab, setActiveTab] = useState<TabId>('courses');
  const activeView = TABS.find((tab) => tab.id === activeTab)?.view;

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
          {activeView}
        </div>
      </div>

      {/* Desktop 2-Column Layout (Left: Courses/Grades + FAQ, Right: Guestbook) */}
      <div className="hidden md:grid grid-cols-[2fr_1fr] max-w-7xl mx-auto px-6 py-6 w-full gap-5 items-stretch">
        {/* Left Column (2/3 width): Determines total height */}
        <div className="flex flex-col gap-5 min-w-0">
          {/* Top Row: Courses & Grades */}
          <div className="grid grid-cols-2 gap-5 h-[500px]">
            <SectionCard
              icon={BookOpen}
              title="수강 과목"
              badge="실시간 잔여석"
              className="min-h-0 h-full overflow-hidden"
              bodyClassName="flex-1 min-h-0 overflow-y-auto pr-1"
            >
              <CourseList />
            </SectionCard>
            <SectionCard
              icon={Award}
              title="성적 조회"
              badge="학기별"
              className="min-h-0 h-full overflow-hidden"
              bodyClassName="flex-1 min-h-0 overflow-y-auto pr-1"
            >
              <Grades />
            </SectionCard>
          </div>

          {/* Bottom Row: FAQ Section (Natural height, no inner scroll, all 5 items visible) */}
          <SectionCard icon={HelpCircle} title="자주 묻는 질문 (FAQ)" badge="수강신청 안내">
            <FAQ />
          </SectionCard>
        </div>

        {/* Right Column (1/3 width): Relative container with absolute inset-0 Guestbook card */}
        <div className="relative w-full h-full min-h-0 min-w-0">
          <SectionCard
            icon={MessageSquare}
            title="방명록"
            badge="커뮤니티"
            className="absolute inset-0 overflow-hidden"
            bodyClassName="flex-1 min-h-0 overflow-hidden flex flex-col"
          >
            <Guestbook />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
