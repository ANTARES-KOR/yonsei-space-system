import { LoginForm } from '../interfaces';

const YSSApi = {
  async login(data: LoginForm) {
    const res = await window.YonseiSpaceSystem.login(data.id, data.pw);
    return res;
  },
};

export default YSSApi;
