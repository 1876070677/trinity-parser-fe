import { useState, type ComponentType } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, FolderOpen, LogOut, Menu, Users, X, type LucideProps } from 'lucide-react';

import { useLogout, useUserInfo } from '@/reactQuery/userQuery';

// 데스크톱 네비에서 대시보드만 아이콘이 없는 것은 현재 디자인을 그대로 옮긴 것이다.
const NAV_ITEMS: { to: string; label: string; icon: ComponentType<LucideProps>; desktopIcon: boolean }[] = [
  { to: '/dashboard', label: '대시보드', icon: BookOpen, desktopIcon: false },
  { to: '/about', label: 'About', icon: Users, desktopIcon: true },
  { to: '/archive', label: 'Archive', icon: FolderOpen, desktopIcon: true },
];

const activeClass = (isActive: boolean) =>
  isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100';

function MainLayout() {
  const navigate = useNavigate();

  // state.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // query.
  const { data: userInfo } = useUserInfo();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => navigate('/'),
    });
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-main-background">
      <header className="bg-white border-b border-gray-200 shrink-0 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="text-2xl text-gray-900 font-bold tracking-tight">Trinity Parser</div>
                <p className="text-sm text-gray-500 mt-0.5">
                  {userInfo?.userNm ? `${userInfo.userNm}님, 환영합니다.` : '가톨릭대학교 포털 파서'}
                </p>
              </div>

              <nav className="hidden lg:flex items-center gap-1 ml-6">
                {NAV_ITEMS.map(({ to, label, icon: Icon, desktopIcon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeClass(isActive)}`
                    }
                  >
                    {desktopIcon && <Icon className="w-4 h-4" />}
                    {label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="메뉴 열기"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-2 space-y-1">
              {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeClass(isActive)}`
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col min-h-0">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
