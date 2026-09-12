import { useState } from 'react';
import { User, RefreshCw, Trash2 } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useUserInfo } from '@/reactQuery/userQuery';
import { useSubjectInfo } from '@/reactQuery/parsingQuery';
import { useParsingStore } from '@/zustand/parsingStore';
import { SubjectInfoParams, SubjectInfoResponse } from '@/common/types/parsing';
import { UserInfo } from '@/common/types/user';

const subjectKey = (sujtNo: string, classNo: string) => `${sujtNo}-${classNo}`;

const buildParams = (userInfo: UserInfo, sujtNo: string, classNo: string): SubjectInfoParams => ({
  sujtNo,
  classNo,
  campFg: userInfo.campFg ?? '',
  shtm: userInfo.shtm ?? '',
  yyyy: userInfo.yyyy ?? '',
});

interface CourseCardProps {
  subject: SubjectInfoResponse;
  isRefreshing: boolean;
  onRefresh: () => void;
  onRemove: () => void;
}

function CourseCard({ subject, isRefreshing, onRefresh, onRemove }: CourseCardProps) {
  const applied = parseInt(subject.tlsnAplyRcnt || '0', 10);
  const limit = parseInt(subject.tlsnLmtRcnt || '0', 10);
  const extra = parseInt(subject.extraCnt || '0', 10);
  const percent = limit > 0 ? Math.min(Math.round((applied / limit) * 100), 100) : 0;
  const hasLimit = limit > 0;
  const isFull = hasLimit && applied >= limit;

  return (
    <div className="bg-sub-background border border-black/[0.04] hover:bg-white rounded-2xl p-4 transition-all duration-200 space-y-3 shadow-2xs hover:shadow-xs group">
      {/* Top Row: Name & Actions */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono font-medium text-gray-700 bg-white px-2 py-0.5 rounded-md border border-gray-200/60 shadow-2xs">
              {subject.sujtNo}-{subject.classNo}
            </span>
            <span className="text-[11px] font-semibold text-gray-800 bg-white px-2 py-0.5 rounded-md border border-gray-200/60 shadow-2xs">
              {subject.sustCd}
            </span>
          </div>
          <h3 className="text-base font-bold text-gray-900 mt-1.5 tracking-tight">
            {subject.sbjtKorNm}
          </h3>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger
              onClick={onRefresh}
              disabled={isRefreshing}
              className="w-8 h-8 rounded-lg bg-white border border-gray-200/60 shadow-2xs flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-gray-900' : ''}`} />
            </TooltipTrigger>
            <TooltipContent>새로고침</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              onClick={onRemove}
              className="w-8 h-8 rounded-lg bg-white border border-gray-200/60 shadow-2xs flex items-center justify-center text-gray-500 hover:text-rose-600 hover:bg-rose-50 active:scale-95 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </TooltipTrigger>
            <TooltipContent>삭제</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Progress / Capacity Bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
            <User className="w-3.5 h-3.5 text-gray-400" />
            <span>
              <strong className="text-gray-900 font-bold">{subject.tlsnAplyRcnt}</strong> / {subject.tlsnLmtRcnt}명
            </span>
          </div>

          {/* Status Badges */}
          <div className="flex items-center gap-1.5">
            {extra > 0 ? (
              <span className="text-[11px] font-bold text-rose-600 bg-white px-2.5 py-0.5 rounded-md border border-rose-200/80 shadow-2xs">
                여석 {extra}석
              </span>
            ) : !hasLimit ? (
              <span className="text-[11px] font-medium text-gray-500 bg-white px-2.5 py-0.5 rounded-md border border-gray-200/60 shadow-2xs">
                정원 미확인
              </span>
            ) : isFull ? (
              <span className="text-[11px] font-bold text-rose-600 bg-white px-2.5 py-0.5 rounded-md border border-rose-200/80 shadow-2xs">
                마감
              </span>
            ) : (
              <span className="text-[11px] font-medium text-gray-600 bg-white px-2.5 py-0.5 rounded-md border border-gray-200/60 shadow-2xs">
                신청가능
              </span>
            )}
          </div>
        </div>

        {/* Gauge Bar Track */}
        <div className="w-full h-2 bg-gray-200/70 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isFull && extra === 0 ? 'bg-rose-500' : 'bg-gray-900'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function CourseList() {
  // state.
  const [sujtNo, setSujtNo] = useState('');
  const [classNo, setClassNo] = useState('');
  const [refreshingKey, setRefreshingKey] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { subjects, removeSubject } = useParsingStore();

  // query.
  const { data: userInfo } = useUserInfo();
  const { mutate, isPending } = useSubjectInfo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!sujtNo || !classNo) {
      setErrorMessage('과목 코드와 분반을 모두 입력해주세요.');
      return;
    }

    if (!userInfo) {
      setErrorMessage('사용자 정보를 불러오는 중입니다.');
      return;
    }

    mutate(buildParams(userInfo, sujtNo, classNo), {
      onError: () => setErrorMessage('과목 조회에 실패했습니다.'),
    });
  };

  const handleRefresh = (targetSujtNo: string, targetClassNo: string) => {
    if (!userInfo) return;

    setRefreshingKey(subjectKey(targetSujtNo, targetClassNo));
    mutate(buildParams(userInfo, targetSujtNo, targetClassNo), {
      onSettled: () => setRefreshingKey(null),
    });
  };

  return (
    <div className="space-y-4 p-1 pr-2">
      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center gap-2 bg-sub-background border border-black/[0.04] p-1.5 rounded-2xl focus-within:bg-white focus-within:border-gray-300 focus-within:ring-2 focus-within:ring-black/5 focus-within:shadow-xs transition-all duration-200">
          <Input
            placeholder="과목 코드 (ex: CS101)"
            value={sujtNo}
            onChange={(e) => setSujtNo(e.target.value)}
            className="flex-[2] bg-transparent border-none shadow-none text-xs focus-visible:ring-0 focus-visible:outline-none placeholder:text-gray-400 h-9 font-medium"
          />
          <div className="w-[1px] h-4 bg-gray-200"></div>
          <Input
            placeholder="분반"
            value={classNo}
            onChange={(e) => setClassNo(e.target.value)}
            className="w-20 bg-transparent border-none shadow-none text-xs focus-visible:ring-0 focus-visible:outline-none placeholder:text-gray-400 h-9 font-medium"
          />
          <Button
            type="submit"
            disabled={isPending}
            className="bg-gray-900 hover:bg-black text-white text-xs font-semibold px-4 h-9 rounded-xl shadow-xs active:scale-95 transition-all duration-200 shrink-0 cursor-pointer disabled:opacity-40"
          >
            {isPending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : '조회'}
          </Button>
        </div>
        {errorMessage && (
          <p className="text-xs text-rose-500 font-medium px-2">{errorMessage}</p>
        )}
      </form>

      {/* Course Cards List */}
      <div className="space-y-3">
        {subjects.length === 0 ? (
          <div className="text-center py-12 px-4 bg-sub-background border border-black/[0.04] rounded-2xl">
            <div className="w-12 h-12 rounded-2xl bg-white text-gray-700 flex items-center justify-center mx-auto mb-3 shadow-2xs border border-gray-200/60">
              <User className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-gray-800">조회된 과목이 없습니다</p>
            <p className="text-xs text-gray-400 mt-1">
              과목 코드와 분반을 입력해 실시간 여석을 확인해보세요.
            </p>
          </div>
        ) : (
          subjects.map((subject) => {
            const key = subjectKey(subject.sujtNo, subject.classNo);
            return (
              <CourseCard
                key={key}
                subject={subject}
                isRefreshing={refreshingKey === key}
                onRefresh={() => handleRefresh(subject.sujtNo, subject.classNo)}
                onRemove={() => removeSubject(subject.sujtNo, subject.classNo)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default CourseList;
