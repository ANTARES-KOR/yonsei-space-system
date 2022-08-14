import { atom } from 'recoil';

const selectState = atom<string | null>({
  key: 'selectState',
  default: null,
});

export { selectState };
