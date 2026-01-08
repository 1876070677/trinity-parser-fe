import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";

import { useLogin } from "@/reactQuery/userQuery";
import { useLoginCount } from "@/reactQuery/managementQuery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function LoginPage() {
  const navigate = useNavigate();

  // state.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [animatedCount, setAnimatedCount] = useState(0);

  // query.
  const loginMutation = useLogin();
  const { data: loginCount } = useLoginCount();

  // 카운트 애니메이션 (ease-out)
  useEffect(() => {
    if (!loginCount) return;

    const duration = 800;
    const startTime = performance.now();

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOut(progress);

      setAnimatedCount(Math.floor(easedProgress * loginCount));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedCount(loginCount);
      }
    };

    requestAnimationFrame(animate);
  }, [loginCount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    loginMutation.mutate(
      { id: email, password },
      {
        onSuccess: () => {
          navigate('/dashboard');
        },
        onError: () => {
          setErrorMessage('로그인에 실패했습니다.');
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-foreground rounded-full mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-gray-900 mb-2">Trinity Parser</h1>
            <p className={`text-gray-600 transition-opacity ${loginCount ? 'opacity-100' : 'opacity-0'}`}>
              {animatedCount.toLocaleString()}명이 선택한
            </p>
            <p className="text-gray-600">가톨릭대 대표 수강 신청 도우미</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                트리니티 아이디
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="student001"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div className={`text-red-700 px-3 py-2 rounded-lg text-xs transition-opacity ${errorMessage ? 'opacity-100' : 'opacity-0'}`}>
              {errorMessage || '\u00A0'}
            </div>

            <Button
              type="submit"
              className="w-full text-white py-3 rounded-lg transition-colors"
            >
              로그인
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;