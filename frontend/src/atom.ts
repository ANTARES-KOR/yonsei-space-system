import { atom } from 'recoil';
import { SingleReservationStatus } from './interfaces';

const tmp = [
  {
    date: '2022-08-28',
    reservations: [
      {
        id: '1',
        title: '[강의(정규)] 학위가운배부',
        start: '06:00',
        end: '08:50',
        date: '2022-09-03',
        url: 'https://www.naver.com',
        allday: false,
      },
      {
        id: '1',
        title: '[강의(정규)] 학위가운배부',
        start: '09:00',
        end: '18:00',
        date: '2022-09-03',
        url: 'https://www.naver.com',
        allday: false,
      },
      {
        id: '1',
        title: '[강의(정규)] 학위가운배부',
        start: '18:10',
        end: '22:00',
        date: '2022-09-03',
        url: 'https://www.naver.com',
        allday: false,
      },
    ],
  },
  {
    date: '2022-09-03',
    reservations: [
      {
        id: '1',
        title: '[강의(정규)] 학위가운배부',
        start: '06:00',
        end: '08:50',
        date: '2022-09-03',
        url: 'https://www.naver.com',
        allday: false,
      },
      {
        id: '1',
        title: '[강의(정규)] 학위가운배부',
        start: '11:00',
        end: '18:00',
        date: '2022-09-03',
        url: 'https://www.naver.com',
        allday: false,
      },
    ],
  },
];

const selectState = atom<string | null>({
  key: 'selectState',
  default: null,
});

const reservationStatusState = atom<SingleReservationStatus[]>({
  key: 'reservationStatusState',
  default: tmp,
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
