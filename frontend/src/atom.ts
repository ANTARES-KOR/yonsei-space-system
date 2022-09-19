import { atom, selector } from 'recoil';
import YSSApi from './apis';
import { ReservationsPerDay, GetReservationForm } from './interfaces/index';
import { filterSpecificDay } from './utils';

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

const lectureRoomChoiceState = atom<GetReservationForm | null>({
  key: 'lectureRoomChoiceState',
  default: null,
});

const reservationStatusState = selector<ReservationsPerDay[] | null>({
  key: 'reservationStatusState',
  get: async ({ get }) => {
    const chosenLectureRoom = get(lectureRoomChoiceState);
    if (chosenLectureRoom != null) {
      const res = await YSSApi.getReservations(chosenLectureRoom);
      const saturdays = filterSpecificDay(6, res);
      return saturdays;
    }
    return null;
  },
});

export {
  isLoginCompletedState,
  lectureRoomChoiceState,
  reservationStatusState,
};
