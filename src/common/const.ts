export const BASE_URL = "";

export const NOTICES = [
    {
        id: 1,
        content: "에브리타임에서 불만이 많은 것 같아 공지를 추가하게 되었습니다.\n\n" +
        "1. 여석은 수강 신청 가능 인원을 의미하는 것이 아닙니다. 취소-시간차 수강신청 규칙에 따라 발생한 취소 분량을 의미합니다. " +
        "여석수는 특정 시간이 되면 서버상의 데이터에 반영이 되므로 0으로 표시될 수 있습니다 (ex. 40/40 여석1 -> 39/40 여석0)\n\n" +
        "2. 파서에서 분모는 전체 수강 정원이 아닙니다. 학년별 수강신청으로 인해 학년별 제한인원이 보일 수 있습니다. " +
        "그렇기 때문에 이것만 가지고 수강 신청을 할 수 없다고 판단하지 않으셨으면 좋겠습니다. \n" +
        "또, 제한인원의 경우 수강바구니와 달라질 수도 있기 때문에 어떤게 맞는지 선뜻 대답하기가 어렵습니다. " +
        "데이터가 이상하다고 판단되면 방명록에 과목코드와 분반을 남겨주시면 확인해보도록 하겠습니다. " +
        "분자 역시 학년별 수강신청 기간에는 지금까지 수강 신청한 누적 신청수로 보이니 유의하시길 바랍니다.\n\n" +
        "3. 파서와 트리니티의 데이터가 다르기는 어렵습니다. 파서의 데이터 원본이 트리니티이며 데이터 가공을 하지 않기 때문에 다르기는 어렵습니다. " +
        "만약 이상한 부분이 있으면 무작정 안된다고 말씀하시지 말고 방명록에 과목 코드와 분반을 적어주시면 이것도 유지보수에 참고하도록 하겠습니다.\n\n" +
        "4. 파서 역시 트리니티를 통하기 때문에 트리니티가 트래픽이 몰리는 시간에는 조회가 당연히 느립니다.\n\n" +
        "저는 졸업생이라 에브리타임도 트리니티의 데이터도 확인하기가 쉽지 않습니다. 문제가 있다면 자세한 상황을 남겨주시면 고쳐보도록 하겠습니다.\n" +
        "모두의 수강신청 성공을 기원합니다.\n" +
        "트리니티 파서 개발자 드림.",
        date: "2026-08-06",
    },
];

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