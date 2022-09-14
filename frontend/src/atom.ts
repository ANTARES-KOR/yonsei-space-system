import { atom } from 'recoil';
import { ReservationsPerDay } from './interfaces';

const selectState = atom<string | null>({
  key: 'selectState',
  default: null,
});

const reservationStatusState = atom<ReservationsPerDay[]>({
  key: 'reservationStatusState',
  default: [],
});

const sessionStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: any) => {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const isLoginCompletedState = atom({
  key: 'isLoginCompletedState',
  default: false,
  effects: [sessionStorageEffect('isLoginCompleted')],
});

export { selectState, reservationStatusState, isLoginCompletedState };
