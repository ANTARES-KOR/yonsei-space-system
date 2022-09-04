import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { useSetRecoilState } from 'recoil';
import { isLoginCompletedState } from '../../atom';
import useCheckLogin from '../../hooks/useCheckLogin';
import styles from './LoginPage.module.scss';
import { LoginForm } from '../../interfaces';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import YSSAPi from '../../apis/index';

const cx = classNames.bind(styles);

function LoginPage() {
  const setIsLoginCompleted = useSetRecoilState(isLoginCompletedState);
  const navigate = useNavigate();
  const { register, setError, handleSubmit, formState } = useForm<LoginForm>();
  const { errors, isSubmitting } = formState;

  useCheckLogin();

  const requestLogin = async (data: LoginForm) => {
    const res = await YSSAPi.login(data);
    if (res) {
      navigate('/', { replace: true });
      setIsLoginCompleted(true);
      return;
    }
    setError('id', {
      types: {
        loginFailed: '아이디 혹은 비밀번호를 다시 확인해 주세요.',
      },
    });
  };

  return (
    <div className={cx('container')}>
      {isSubmitting && <Loading />}
      <h1>Yonsei space system</h1>
      <h5>연세포탈 아이디와 비밀번호를 입력하세요.</h5>
      <form onSubmit={handleSubmit(requestLogin)}>
        <input
          {...register('id', {
            required: '아이디를 입력하세요.',
            pattern: {
              value: /^[0-9]{10}$/g,
              message: '올바른 아이디를 입력하세요.',
            },
          })}
          type="text"
          placeholder="학번 10자리"
        />
        <div className={cx('error')}>{errors.id?.message}</div>
        <input
          {...register('pw', { required: '비밀번호를 입력하세요' })}
          placeholder="비밀번호"
          type="password"
        />
        <div className={cx('error')}>{errors.pw?.message}</div>
        <Button label="로그인" fullWidth />
      </form>
      <div className={cx('error', 'red')}>{errors.id?.types?.loginFailed}</div>
    </div>
  );
}

export default LoginPage;
