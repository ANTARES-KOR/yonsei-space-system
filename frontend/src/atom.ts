import { atom, selector } from 'recoil';
import YSSApi from './apis';
import {
  ReservationsPerDay,
  GetReservationForm,
  LectureRoomsPerBuilding,
} from './interfaces/index';
import {
  findUpcomingSaturdays,
  queryReservationsOnSpecificDates,
} from './utils';

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
      const filteredRes = queryReservationsOnSpecificDates(
        res,
        findUpcomingSaturdays(2, new Date()),
      );
      return filteredRes;
    }
    return null;
  },
});

const lectureRoomsListState = selector<LectureRoomsPerBuilding[]>({
  key: 'lectureRoomsListState',
  get: async () => {
    const res = await YSSApi.getBuildingRoomList();
    return res;
  },
});

export {
  isLoginCompletedState,
  lectureRoomChoiceState,
  reservationStatusState,
  lectureRoomsListState,
};
