export const BASE_URL = "";
export const FAQS = [
    { 
        question: "검색 결과의 수강 제한 인원은 학년별 제한 인원인가요? 아니면 전체 제한 인원인가요?", 
        answer: "학년별 수강 신청 기간에 학년별 제한 인원이 존재하는 과목의 경우 학년별 제한 인원이 표시될 수 있습니다. \
        이때, 오후 5시를 기점으로 다음 날 수강 신청 학년의 제한 인원이 보입니다." },
    { 
        question: "현재 수강 신청 인원이 제한 인원보다 작은 경우가 발생하나요?", 
        answer: "학년별 수강 신청 기간에는 학년별 제한 인원이 보이기 때문에 그럴 수 있습니다. 현재 수강 신청 인원은 말 그대로 \
        현재까지 수강 신청한 전체 인원을 보여주기 때문에 헷갈릴 수 있습니다. 예를 들어, 현재까지 3, 4학년을 통틀어 20명이 수강신청을 했는데 \
        내일 2학년의 제한 인원이 10명이라면 질문과 같이 제한 인원이 더 작은 경우가 발생하게 됩니다." },
    {
        question: "트리니티랑 트리니티 파서랑 보이는 정보가 다를 수 있나요?",
        answer: "트리니티 파서는 트리니티의 정보를 가지고 오기 때문에 기본적으로는 동일한 상태를 유지합니다. 개발자는 지금까지 다른 경우를 확인하지 못했습니다."
    },
    {
        question: "수강 신청 인원이 꽉 차있는데 여석이 있는 이유가 뭐예요?",
        answer: "여석은 특정 시점에만 풀립니다. 수강 신청 인원이 꽉 차있는 상황에서 누군가 수강 취소를 하게 되면, 수강 신청 인원에서 -1이 되는 것이 아니라 \
        여석이 +1이 되는 식입니다. 그렇기 때문에 수강 신청 인원이 다 찬 상태에서 여석이 존재할 수 있습니다. 또, 오후에 발생된 여석의 경우 \
        학교 시스템 상에서 오후 5시가 되면 여석이 0이 되고 여석만큼 수강 신청 인원이 줄어드는 것으로 알고 있습니다. 그래서 오후 늦게 조회를 해 여석이 0인 상태라면,\
        여석보다는 제한 인원과 수강 신청 인원을 통해 내가 신청할 수 있는지 없는지를 판단하면 됩니다."
    },
    {
        question: "여석이 0인데 수강 제한 인원보다 현재 신청 인원이 적어요. 수강 신청 가능한가요?",
        answer: "여석은 취소 시점에 발생되는 것이기 때문에 제한 인원보다 현재 신청 인원이 적다면 수강 신청이 가능하다는 것을 의미합니다."
    }
];

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: '김시현',
    role: 'Fullstack Engineer',
    description: '확장성과 안정성 고려한 시스템을 설계하고 만들어 내는 것을 좋아하는 개발자 김시현입니다.',
    image: 'Sihyun_profile.jpg',
    github: 'https://github.com/1876070677',
  },
  {
    id: 2,
    name: '김상연',
    role: 'Frontend Developer',
    description: '사용자 중심의 웹 애플리케이션 개발을 위해 소통하는 프론트엔드 개발자 김상연입니다.',
    image: '',
    github: 'https://github.com/KECO-00',
  },
  {
    id: 3,
    name: '정지원',
    role: 'Frontend Developer & UI/UX Designer',
    description: '사용자 중심의 디자인으로 직관적인 인터페이스를 만들기 위해 노력하는 개발자 정지원입니다.',
    image: 'Jiwon_profile.jpg',
    github: 'https://github.com/Stopone02',
  },
];

export const WEBSITES = [
  {
    id: 1,
    name: 'CATXI(캣시)',
    description: ' 가톨릭대 택시 동승 서비스',
    url: 'https://catxi-university-taxi-b0936.web.app/',
    subUrl: 'https://everytime.kr/380299/v/383292167',
    image: '/thumb/catxi.png',
  },
  {
    id: 2,
    name: 'CAT-SPOT',
    description: '빈 강의실 찾기 서비스',
    url: 'https://catspot.vercel.app/',
    subUrl: 'https://everytime.kr/380299/v/374859243',
    image: '/thumb/catspot.png',
  },
  {
    id: 3,
    name: '냠톨릭',
    description: '학교주변음식점 사이트',
    url: 'https://nyumtolic.com',
    subUrl: 'https://everytime.kr/380299/v/375006765',
    image: '/thumb/nyamtolic.png',
  },
  {
    id: 4,
    name: 'CUK밥',
    description: '가톨릭대학교 학생들을 위한 학식 메뉴 확인 앱',
    url: 'https://play.google.com/store/apps/details?id=com.cukbab',
    subUrl: 'https://everytime.kr/367442/v/389083170',
    image: '/thumb/cukbab.png',
  },
  {
    id: 5,
    name: 'CUKCAT',
    description: '지속 가능한 학교생활 편의 앱',
    subUrl: 'https://everytime.kr/380299/v/251136810',
    image: '/thumb/cukcat.jpg',
  },
  {
    id: 6,
    name: 'COMAtching',
    description: '남녀 성비 5:5 최고의 매칭 서비스',
    subUrl: 'https://everytime.kr/380299/v/391170986',
    url: 'https://comatching.site/',
    image: '/thumb/comatching.jpg',
  },
  {
    id: 7,
    name: '빈 강의실 찾기 웹사이트',
    description: '현재 강의 중이 아닌 빈 강의실을 한 눈에 확인할 수 있어요!',
    url: 'https://cuk-classroom.azurewebsites.net/',
    subUrl: 'https://everytime.kr/380299/v/391968350',
    image: '/thumb/cukclassroom.png',
  },
];