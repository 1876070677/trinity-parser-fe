import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowRight } from "lucide-react";

import { useLogin } from "@/reactQuery/userQuery";
import { useLoginCount } from "@/reactQuery/managementQuery";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function LoginPage() {
  const navigate = useNavigate();

  // state.
  const [id, setId] = useState('');
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

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.max(0, Math.min(elapsed / duration, 1));
      const easedProgress = easeOut(progress);

      setAnimatedCount(Math.floor(easedProgress * loginCount));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setAnimatedCount(loginCount);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [loginCount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    
    loginMutation.mutate(
      { id, password },
      {
        onSuccess: () => {
          navigate('/dashboard');
        },
        onError: () => {
          setErrorMessage('아이디 또는 비밀번호를 다시 확인해주세요.');
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-main-background flex flex-col items-center justify-center p-4 selection:bg-gray-900 selection:text-white">
      <div className="max-w-[400px] w-full">
        {/* Main Elevated White Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_28px_rgba(0,0,0,0.04)] space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sub-background border border-black/[0.04] text-gray-900 flex items-center justify-center mx-auto shadow-2xs">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Trinity Parser</h1>
              <p className="text-xs text-gray-500 mt-1">가톨릭대학교 포털 수강신청 도우미</p>
            </div>

            {loginCount ? (
              <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-600 bg-sub-background px-3 py-1 rounded-full border border-black/[0.04]">
                <span className="font-bold text-gray-900">{animatedCount.toLocaleString()}명</span>
                <span>이 선택한 서비스</span>
              </div>
            ) : null}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            {/* ID Input Sub-card */}
            <div className="bg-sub-background border border-black/[0.04] p-3.5 rounded-2xl focus-within:bg-white focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-black/5 focus-within:shadow-xs transition-all duration-200">
              <Label htmlFor="login-id" className="block text-[11px] font-semibold text-gray-500 mb-1">
                트리니티 아이디
              </Label>
              <Input
                id="login-id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full bg-transparent border-none shadow-none text-sm text-gray-900 placeholder:text-gray-400 font-medium focus-visible:ring-0 focus-visible:outline-none p-0 h-auto"
                placeholder="학번 또는 아이디"
                required
              />
            </div>

            {/* Password Input Sub-card */}
            <div className="bg-sub-background border border-black/[0.04] p-3.5 rounded-2xl focus-within:bg-white focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-black/5 focus-within:shadow-xs transition-all duration-200">
              <Label htmlFor="password" className="block text-[11px] font-semibold text-gray-500 mb-1">
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-none shadow-none text-sm text-gray-900 placeholder:text-gray-400 font-medium focus-visible:ring-0 focus-visible:outline-none p-0 h-auto"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-xs font-medium text-rose-600 bg-rose-50/80 px-3.5 py-2.5 rounded-xl border border-rose-200/60">
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-11 bg-gray-900 hover:bg-black text-white rounded-xl font-semibold text-sm shadow-xs active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2 mt-2"
            >
              <span>{loginMutation.isPending ? '로그인 중...' : '로그인'}</span>
              {!loginMutation.isPending && <ArrowRight className="w-4 h-4" />}
            </Button>
          </form>

          {/* Footer Note */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-gray-400 leading-relaxed">
              입력한 계정 정보는 학교 포털 인증을 위해<br />Trinity Parser 서버로 전송됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
