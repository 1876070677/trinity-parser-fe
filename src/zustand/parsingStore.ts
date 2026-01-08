import { create } from 'zustand';

import { SubjectInfoResponse } from '@/common/types/parsing';

interface ParsingStore {
  subjects: SubjectInfoResponse[];
  addSubject: (subject: SubjectInfoResponse) => void;
  updateSubject: (sujtNo: string, classNo: string, subject: SubjectInfoResponse) => void;
  removeSubject: (sujtNo: string, classNo: string) => void;
  clearSubjects: () => void;
}

export const useParsingStore = create<ParsingStore>()((set) => ({
  subjects: [],

  addSubject: (subject) =>
    set((state) => {
      // 이미 존재하는 과목이면 업데이트, 아니면 추가
      const exists = state.subjects.some(
        (s) => s.sujtNo === subject.sujtNo && s.classNo === subject.classNo
      );
      if (exists) {
        return {
          subjects: state.subjects.map((s) =>
            s.sujtNo === subject.sujtNo && s.classNo === subject.classNo ? subject : s
          ),
        };
      }
      return { subjects: [...state.subjects, subject] };
    }),

  updateSubject: (sujtNo, classNo, subject) =>
    set((state) => ({
      subjects: state.subjects.map((s) =>
        s.sujtNo === sujtNo && s.classNo === classNo ? subject : s
      ),
    })),

  removeSubject: (sujtNo, classNo) =>
    set((state) => ({
      subjects: state.subjects.filter(
        (s) => !(s.sujtNo === sujtNo && s.classNo === classNo)
      ),
    })),

  clearSubjects: () => set({ subjects: [] }),
}));