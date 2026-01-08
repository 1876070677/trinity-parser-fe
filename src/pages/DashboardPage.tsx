import { BookOpen, Award, MessageSquare, HelpCircle } from 'lucide-react';

import CourseList from '@/pages/views/CourseList';
import Grades from '@/pages/views/Grades';
import Guestbook from '@/pages/views/Guestbook';
import FAQ from '@/pages/views/FAQ';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

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
    <div className="h-full flex flex-col">
      <nav className="md:hidden bg-white border-b border-gray-200 shrink-0">
        <div className="flex">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-3 ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Content */}
      <div className="md:hidden flex-1 overflow-hidden flex flex-col px-4 py-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 h-0">
            {activeTab === 'courses' && <CourseList />}
            {activeTab === 'grades' && <Grades />}
            {activeTab === 'guestbook' && <Guestbook />}
            {activeTab === 'faq' && <FAQ />}
          </ScrollArea>
        </div>
      </div>

      <div className="hidden md:block max-w-7xl mx-auto px-6 py-8 h-full">
        <div className="grid grid-cols-2 grid-rows-2 gap-6 h-full">
          {/* Courses Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-gray-900">수강 과목</h2>
            </div>
            <ScrollArea className="flex-1 h-0">
              <CourseList />
            </ScrollArea>
          </div>

          {/* Grades Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <Award className="w-5 h-5 text-green-600" />
              <h2 className="text-gray-900">성적</h2>
            </div>
            <ScrollArea className="flex-1 h-0">
              <Grades />
            </ScrollArea>
          </div>

          {/* Guestbook Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              <h2 className="text-gray-900">방명록</h2>
            </div>
            <ScrollArea className="flex-1 h-0">
              <Guestbook />
            </ScrollArea>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4 shrink-0">
              <HelpCircle className="w-5 h-5 text-orange-600" />
              <h2 className="text-gray-900">FAQ</h2>
            </div>
            <ScrollArea className="flex-1 h-0">
              <FAQ />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;