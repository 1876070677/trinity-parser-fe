import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, FolderOpen, LogOut, Menu, Users, X } from 'lucide-react';

import { useLogout, useUserInfo } from '@/reactQuery/userQuery';
import { Button } from '@/components/ui/button';

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // state.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 현재 경로에 따라 활성 페이지 결정
  const getActivePage = () => {
    if (location.pathname === '/about') return 'about';
    if (location.pathname === '/archive') return 'archive';
    return 'dashboard';
  };
  const handleMobileNavigate = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const activePage = getActivePage();

  // query.
  const { data: userInfo} = useUserInfo();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/');
      },
      onError: () => {
        navigate('/');
      },
    });
  };

  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col">
      <header className="bg-white border-b border-gray-200 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-2xl text-gray-900">Trinity Parser</div>
                <p className="text-sm text-gray-500 mt-1">{`${userInfo?.userNm}님, 환영합니다.`}</p>
              </div>
              <nav className="hidden lg:flex items-center gap-1 ml-8">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/dashboard')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activePage === 'dashboard'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  대시보드
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/about')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    activePage === 'about'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  About
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate('/archive')}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                    activePage === 'archive'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FolderOpen className="w-4 h-4" />
                  Archive
                </Button>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-primary"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">로그아웃</span>
              </Button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-2 space-y-1">
              <button
                onClick={() => handleMobileNavigate('/dashboard')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                  activePage === 'dashboard'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                대시보드
              </button>
              <button
                onClick={() => handleMobileNavigate('/about')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                  activePage === 'about'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users className="w-4 h-4" />
                About
              </button>
              <button
                onClick={() => handleMobileNavigate('/archive')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${
                  activePage === 'archive'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                Archive
              </button>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;