import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

import { useLogout, useUserInfo } from '@/reactQuery/userQuery';
import { Button } from '@/components/ui/button';

function MainLayout() {
  const navigate = useNavigate();

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
    <div className="h-screen overflow-hidden flex flex-col">
      <header className="bg-white border-b border-gray-200 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gray-900">Trintiy Parser</h1>
              <p className="text-sm text-gray-500 mt-1">{`${userInfo?.userNm}님, 환영합니다.`}</p>
            </div>
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
      </header>
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;