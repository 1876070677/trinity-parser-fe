import { useGrade } from '@/reactQuery/parsingQuery';
import { useUserInfo } from '@/reactQuery/userQuery';

function Grades() {
  const { data: userInfo } = useUserInfo();

  const gradeParams = userInfo
    ? {
        campFg: userInfo.campFg ?? '',
        shtmYyyy: userInfo.shtmYyyy ?? '',
        shtmFg: userInfo.SHTM_FG ?? '',
        stdNo: userInfo.userNo ?? '',
      }
    : null;

  const { data: grades, isLoading, error } = useGrade(gradeParams);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto"></div>
          <p className="text-xs text-gray-400 font-medium">성적 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 bg-rose-50/70 rounded-2xl">
        <p className="text-xs text-rose-600 font-semibold">휴학생 및 졸업생은 조회가 불가능합니다.</p>
      </div>
    );
  }

  if (!grades || grades.length === 0) {
    return (
      <div className="p-8 text-center bg-[#F9F9FB] rounded-2xl">
        <p className="text-xs text-gray-400">조회된 성적 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-1 pr-2">
      {/* Grade Summary Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#F8F9FA] border border-black/[0.04] rounded-xl">
        <span className="text-xs font-medium text-gray-600">
          이번 학기 수강 성적
        </span>
        <span className="text-xs font-bold text-gray-900">
          총 {grades.length}과목
        </span>
      </div>

      {/* Grade Cards List */}
      {grades.map((grade, idx) => {
        const gradeText = grade.grdAdm || '';
        const isA = gradeText.startsWith('A');

        return (
          <div
            key={grade.sbjtNo ?? idx}
            className="bg-[#F8F9FA] border border-black/[0.04] hover:bg-white rounded-2xl p-4 transition-all duration-200 space-y-3 shadow-2xs hover:shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono font-medium text-gray-400">
                  {grade.sbjtNo}
                </span>
                <h4 className="text-sm font-bold text-gray-900 leading-snug mt-0.5">
                  {grade.sbjtKorNm}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                {grade.centesScorAdm && (
                  <span className="text-xs font-semibold text-gray-600 font-mono">
                    {grade.centesScorAdm}점
                  </span>
                )}
                {grade.grdAdm && (
                  <span
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold tracking-tight shadow-xs ${
                      isA
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {grade.grdAdm}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Grades;