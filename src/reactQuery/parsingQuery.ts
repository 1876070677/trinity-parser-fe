import { useMutation, useQuery } from '@tanstack/react-query';

import { BASE_URL } from '@/common/const';
import { throwIfNotOk } from '@/lib/httpError';
import {
  CurrentGradeInfo,
  GradeParams,
  SubjectInfoParams,
  SubjectInfoResponse,
} from '@/common/types/parsing';
import { useParsingStore } from '@/zustand/parsingStore';

const fetchSubjectInfo = async (
  params: SubjectInfoParams
): Promise<SubjectInfoResponse> => {
  const res = await fetch(`${BASE_URL}/api/parsing/subjectInfo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  throwIfNotOk(res, 'subjectInfo 요청 실패');
  const data = await res.json();
  return data.subjectInfo;
};

export const useSubjectInfo = () => {
  const { addSubject } = useParsingStore();

  return useMutation({
    mutationFn: fetchSubjectInfo,
    onSuccess: (data) => {
      addSubject(data);
    },
  });
};

const fetchGrade = async (params: GradeParams): Promise<CurrentGradeInfo[]> => {
  const res = await fetch(`${BASE_URL}/api/parsing/grade`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  throwIfNotOk(res, 'grade 요청 실패');
  const data = await res.json();
  return data.grades;
};

export const useGrade = (params: GradeParams | null) => {
  return useQuery({
    queryKey: ['grade', params],
    queryFn: () => fetchGrade(params!),
    enabled: !!params,
  });
};