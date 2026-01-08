import { useState } from 'react';
import { User, RefreshCw, Trash2 } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUserInfo } from '@/reactQuery/userQuery';
import { useSubjectInfo } from '@/reactQuery/parsingQuery';
import { useParsingStore } from '@/zustand/parsingStore';

function CourseList() {
  // state.
  const [sujtNo, setSujtNo] = useState('');
  const [classNo, setClassNo] = useState('');
  const [refreshingKey, setRefreshingKey] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { subjects, removeSubject } = useParsingStore();

  console.log(subjects);

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

    mutate(
      {
        sujtNo,
        classNo,
        campFg: userInfo.campFg ?? '',
        shtm: userInfo.shtm ?? '',
        yyyy: userInfo.yyyy ?? '',
      },
      {
        onError: () => {
          setErrorMessage('과목 조회에 실패했습니다.');
        },
      }
    );
  };

  const handleRefresh = (targetSujtNo: string, targetClassNo: string) => {
    if (!userInfo) return;

    setRefreshingKey(`${targetSujtNo}-${targetClassNo}`);
    mutate(
      {
        sujtNo: targetSujtNo,
        classNo: targetClassNo,
        campFg: userInfo.campFg ?? '',
        shtm: userInfo.shtm ?? '',
        yyyy: userInfo.yyyy ?? '',
      },
      {
        onSettled: () => setRefreshingKey(null),
      }
    );
  };

  const handleRemove = (targetSujtNo: string, targetClassNo: string) => {
    removeSubject(targetSujtNo, targetClassNo);
  };

  return (
    <div className="space-y-4 p-1 pr-3">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="과목 코드"
            value={sujtNo}
            onChange={(e) => setSujtNo(e.target.value)}
            className="flex-1"
          />
          <Input
            placeholder="분반"
            value={classNo}
            onChange={(e) => setClassNo(e.target.value)}
            className="w-24"
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? '조회중...' : '조회'}
          </Button>
        </div>
        {errorMessage && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}
      </form>

      <div className="space-y-3">
        {subjects?.map((subject) => (
          <div
            key={`${subject.sujtNo}-${subject.classNo}`}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {subject.sujtNo}-{subject.classNo}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {subject.sustCd}
                  </span>
                </div>
                <h3 className="text-gray-900 mt-1">{subject.sbjtKorNm}</h3>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleRefresh(subject.sujtNo, subject.classNo)}
                  disabled={refreshingKey === `${subject.sujtNo}-${subject.classNo}`}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${refreshingKey === `${subject.sujtNo}-${subject.classNo}` ? 'animate-spin' : ''}`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleRemove(subject.sujtNo, subject.classNo)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>
                  {subject.tlsnAplyRcnt} / {subject.tlsnLmtRcnt}명
                </span>
              </div>
              {subject.extraCnt && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-orange-600">
                    여석: {subject.extraCnt}명
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;