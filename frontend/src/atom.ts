import { atom } from 'recoil';
import { SingleReservationStatus } from './interfaces';

const tmp = [
  {
    date: '8/28 (토)',
    reservations: [
      {
        startTime: '06:00',
        endTime: '08:50',
        eventName: '[강의(정규)] 학위가운배부',
      },
      {
        startTime: '09:00',
        endTime: '18:00',
        eventName: '[강의(정규)] 학위가운배부',
      },
      {
        startTime: '18:10',
        endTime: '22:00',
        eventName: '[강의(정규)] 학위가운배부',
      },
    ],
  },
  {
    date: '9/3 (토)',
    reservations: [
      {
        startTime: '06:00',
        endTime: '08:50',
        eventName: '[강의(정규)] 학위가운배부',
      },
      {
        startTime: '09:00',
        endTime: '18:00',
        eventName: '[강의(정규)] 학위가운배부',
      },
      {
        startTime: '18:10',
        endTime: '22:00',
        eventName: '[강의(정규)] 학위가운배부',
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
