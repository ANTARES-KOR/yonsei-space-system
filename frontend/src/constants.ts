import { LectureRoomsPerBuilding } from './interfaces/index';

export const timeslotsArr = Array(32)
  .fill(0)
  .map((v, i) => i);

export const LectureRoomList: LectureRoomsPerBuilding[] = [
  {
    building_name: '제 1공학관',
    building_uid: 102,
    rooms: [
      {
        room_name: 'A320',
        room_uid: 555,
      },
      {
        room_name: 'A546',
        room_uid: 704,
      },
    ],
  },
  {
    building_name: '제 4공학관',
    building_uid: 124,
    rooms: [
      {
        room_name: 'D403',
        room_uid: 14151,
      },
      {
        room_name: 'D404',
        room_uid: 14152,
      },
      {
        room_name: 'D503',
        room_uid: 14158,
      },
      {
        room_name: 'D504',
        room_uid: 14159,
      },
    ],
  },
];
