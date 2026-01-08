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
    image: 'https://cf-ea.everytime.kr/attach/574/76452621/everytime-web-1750221984492.jpg?Expires=1767879626&Key-Pair-Id=APKAICU6XZKH23IGASFA&Signature=PaVHd-JtVVdcPLg8jywFQm49OQbPLA~EASQjcs-vyi8zvNpS3I65vteUd7SudlUCtJuJedYIoZNrGWlwH7J5-hXnxdfvAnYCdFv61Qsvq4sTaD6HcNnvC2kjDC2kJsXgMnhSEEYA3lU7IG75VcHifMX3d-U7fgMGz4201RA6-vPxNkYQrLe2LCSG1ZjIrJzgNqEjFu3zGXEDu1ebvik~SgZ8G2S6CqgMWzrwu9AJFA-4jylSCGKbx29RunLC805uxde9rSLhGyZeUdznMW2j1wQxuH6tw7tsbu3Ao1eQwl5OEPprCMxZ6dxqMBOPhjKfoZW-LDiCvzxO0Li0Bn9Gqw__',
  },
  {
    id: 2,
    name: 'CAT-SPOT',
    description: '빈 강의실 찾기 서비스',
    url: 'https://catspot.vercel.app/',
    subUrl: 'https://everytime.kr/380299/v/374859243',
    image: 'https://cf-ea.everytime.kr/attach/706/74778777/everytime-web-1742916297683.jpg?Expires=1767879859&Key-Pair-Id=APKAICU6XZKH23IGASFA&Signature=s1h2OCwcPy1HfoqjkF6C9s~ZDFqFbSbp88m-DklalMnJtk-6OoXxdHbVZ0iSlEdJiI9WfLvRv0-vh-Rap9CQLxG4dODucSRJkuCxz9ReHTYPH9WLAuett3RyXS-rKwUMl8LM3JnB4mib~u37EC8E3QG1HNSduYiVJsW54~7ynlmUc49ALkw84D~uU65vvQZ1zo~1qAMrTbO6hjlDkLrfkEhFjDFn1YE14eqmzNUZX4eFhbeTPgSlSdOGwM5GGF0XeGYBILKo-jvBmBHHQ3lXh7NkseaRs~xchbH9vPjlNDI2KN23XbvSNQceEr9MRftl6uR4teHOcUkt7KFZAF7tQw__',
  },
  {
    id: 3,
    name: '냠톨릭',
    description: '학교주변음식점 사이트',
    url: 'https://nyumtolic.com',
    subUrl: 'https://everytime.kr/380299/v/375006765',
    image: 'https://cf-ea.everytime.kr/attach_thumbnail/697/74808902/everytime-web-1743034577774.jpg?Expires=1767880097&Key-Pair-Id=APKAICU6XZKH23IGASFA&Signature=PYp3SHc0xKe37Oa~3Er8QXbWjiUOeq854M36J4kzAF1pu08sRLIOvD~eIfQL8PrOX9WUu3kTD76rgDkG84LX8vCOvUSjTXiqey6p~jc1WalSlKMNLVcE~AWbegQTHVK0xzYP6sGqNpw3XiI2EkACybX4QgI-Dw4hoIr7VderjMcojOpacB~V~3jz7UB5gEx9pitzzxLBXSz~j02Z~uWjXfT6Pipr9cD7Crchytfxgn4s9o-BmfxwCf6KzjH6DNhsQRytgXjPQF7rPbYVyUfQlac-6guhkOXCmjHr8-mP8zppR2acKiOQgZw7484zlQIl3ClwdtBTHfLA8KttWt4Thg__',
  },
  {
    id: 4,
    name: 'CUK밥',
    description: '가톨릭대학교 학생들을 위한 학식 메뉴 확인 앱',
    url: 'https://play.google.com/store/apps/details?id=com.cukbab',
    subUrl: 'https://everytime.kr/367442/v/389083170',
    image: 'https://cf-ea.everytime.kr/attach_thumbnail/617/77931325/everytime-1756994085988.jpg?Expires=1767880276&Key-Pair-Id=APKAICU6XZKH23IGASFA&Signature=n9graOLPYLCY5SeVk6~WXMDrsVioiaSVzL6ljwzKJIjSUCYQKoitfF6CxdbJWZGYp8~kCc88Ly81N~P9EeT27EJGhXGQKzcFK9E811hBW6lP5SyAF0l813oFZbuzVdohOUzEH1Qla5JxxoihEyMnROsfvdfcfjlkOsNrM2lkG5797N2lDnhZtKt1GlG7zVchy4CHE0KpRLF3DKdqUAC1ge8E9nDaHyNwOM-k5BWirI6hjWI-CEeAzugw5vNwGKONl4ekkHGqcACsFayjDM9Lt44itq8Dy87W1thGw9zOqc7qLTqISoLdYc2rVgTjmOK3e-3MWOS7X~NV0EhjjxSODg__',
  },
  {
    id: 5,
    name: 'CUKCAT',
    description: '지속 가능한 학교생활 편의 앱',
    subUrl: 'https://everytime.kr/380299/v/251136810',
    image: 'https://cf-ea.everytime.kr/attach_thumbnail/135/49838472/everytime-web-1652322886061.jpg?Expires=1767880406&Key-Pair-Id=APKAICU6XZKH23IGASFA&Signature=WImUV4iBoT-PQMulDk-M0B8feiYzhYsE~N7TywoINpGyEWduPzu4A9N9evwvxMsNhT2cbL11zSkQYsDO6BAE4r6dQP2EcX8jxG5Fk9iJYdY7ckpjoQpafObfBWhFn3EyX73vpf3fr7eEUms9nfG0PCnfIY0ifjmCsZYDrNbfreSpROLwWJnNQXT1-GzYRgiUEp79c4iVUuFPuOndzmeny9Cy0XdUGmrA5iWPAefW6aswLIXhHwX6iQ0MNXWtWL53UxUlZAAq-9s69dV5o1SSJVZ5JnUE1P5pIt1v2Me~uO-jM-fXJu7IYpcrBY8cpblWMnn4azxBoOOfHVgwr0vZBg__',
  },
  {
    id: 6,
    name: 'COMAtching',
    description: '남녀 성비 5:5 최고의 매칭 서비스',
    subUrl: 'https://everytime.kr/380299/v/391170986',
    url: 'https://comatching.site/',
    image: 'https://cf-ea.everytime.kr/attach_thumbnail/866/78460698/everytime-1759381340355.jpg?Expires=1767880553&Key-Pair-Id=APKAICU6XZKH23IGASFA&Signature=LKkPNo3UNn~CmncxNbyZFTpmnVdmYnHKZwoXjxLRQXG1hbIyGmeyIkX8TGSfJhIjgNVecsPP-Txg1lV-E1fRscyjxnlbxihjLlO7ccxxu4N2MaIihcRHogBQRkRlhY8J03aF-n-x9NAT-~sDsWi9TO~kelRHDI5fhrqi~Cf2Dtn6YvAP~22N7Tpjqz9xUZwx-4fJQXPpj0vpENbqzLvsixBl4Lp65aaEfs60BbK3RxaP8dAXXU2GT5MLVWgRTN2v0iQNWOgiVkmQby68yqLQ7q8qgjkw8qPNsQVHSiBk51C67MNCs5pNd2xtJAN~0o~yE5YEESmECYepNP2~cNV6FA__',
  },
  {
    id: 7,
    name: '빈 강의실 찾기 웹사이트',
    description: '현재 강의 중이 아닌 빈 강의실을 한 눈에 확인할 수 있어요!',
    url: 'https://cuk-classroom.azurewebsites.net/',
    subUrl: 'https://everytime.kr/380299/v/391968350',
    image: '',
  },
];