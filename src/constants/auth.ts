export const LOGIN_FIELDS = [
  {
    label: "이메일",
    name: "email" as const,
    placeholder: "이메일을 입력해주세요",
    type: "text" as const,
  },
  {
    label: "비밀번호",
    name: "password" as const,
    placeholder: "비밀번호를 입력해주세요",
    type: "password" as const,
  },
];

export const SIGNUP_FIELDS = [
  {
    label: "이메일",
    name: "email" as const,
    placeholder: "이메일을 입력해주세요",
    type: "text" as const,
  },
  {
    label: "성",
    name: "firstName" as const,
    placeholder: "성을 입력해주세요",
    type: "text" as const,
  },
  {
    label: "이름",
    name: "lastName" as const,
    placeholder: "이름을 입력해주세요",
    type: "text" as const,
  },
  {
    label: "비밀번호",
    name: "password" as const,
    placeholder: "비밀번호를 입력해주세요",
    type: "password" as const,
  },
  {
    label: "비밀번호 확인",
    name: "passwordCheck" as const,
    placeholder: "비밀번호 확인을 입력해주세요",
    type: "password" as const,
  },
];

export const PROFILE_MENU_ITEMS = [
  { imageNum: 1, title: "관심 매물", path: '/favorite' },
  { imageNum: 2, title: "매물 분석", path: '/analyze' },
  { imageNum: 3, title: "체크리스트", path: '/checklist' },
];
