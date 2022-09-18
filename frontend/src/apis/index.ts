import { LoginForm, GetReservationForm } from '../interfaces';

const YSSApi = {
  async login(data: LoginForm) {
    const res = await window.YonseiSpaceSystem.login(data.id, data.pw);
    return res;
  },
  async getReservations(data: GetReservationForm) {
    const res = await window.YonseiSpaceSystem.getRoomReservations(
      data.building_uid,
      data.room_uid,
    );
    return res;
  },
};

export default YSSApi;
