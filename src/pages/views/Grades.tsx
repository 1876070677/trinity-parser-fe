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
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-500">성적 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600">휴학생 및 졸업생은 확인이 불가능합니다..</p>
      </div>
    );
  }

  if (!grades || grades.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">성적 정보가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-1 pr-3">
      {grades.map((grade, idx) => (
        <div
          key={grade.sbjtNo ?? idx}
          className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs text-gray-500 mr-2">{grade.sbjtNo}</span>
              <span className="text-sm text-gray-900">{grade.sbjtKorNm}</span>
            </div>
            <div className="flex items-center gap-2">
              {grade.centesScorAdm && (
                <span className="text-sm text-gray-600">{grade.centesScorAdm}점</span>
              )}
              {grade.grdAdm && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                  {grade.grdAdm}
                </span>
              )}
            </div>
          </div>
          {grade.details && grade.details.length > 0 && (
            <div className="mt-2 pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-400 mb-1">세부 점수</p>
              <ul className="text-xs text-gray-500 space-y-1">
                {grade.details.map((detail, detailIdx) => (
                  <li key={detailIdx}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Grades;