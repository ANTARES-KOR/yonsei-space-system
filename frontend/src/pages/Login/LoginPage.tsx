import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import YSSAPi from '../../apis/index';
import { LoginForm } from '../../interfaces';

const cx = classNames.bind(styles);

function LoginPage() {
  const [isLoginFailed, setIsLoginFailed] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const { errors, isSubmitting } = formState;

  const requestLogin = async (data: LoginForm) => {
    const res = await YSSAPi.login(data);
    if (res) {
      navigate('/', { replace: true });
      return;
    }
    setIsLoginFailed(true);
  };

  const onFocusOnInputBox = () => {
    setIsLoginFailed(null);
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
              value: /[0-9]{10}/,
              message: '올바른 아이디를 입력하세요.',
            },
          })}
          placeholder="학번 10자리"
          onFocus={() => onFocusOnInputBox()}
        />
        <div className={cx('error', { hidden: !errors.id })}>
          {errors.id?.message}
        </div>
        <input
          {...register('pw', { required: '비밀번호를 입력하세요' })}
          placeholder="비밀번호"
          // type="password"
          onFocus={() => onFocusOnInputBox()}
        />
        <div className={cx('error', { hidden: !errors.pw })}>
          {errors.pw?.message}
        </div>
        <Button label="로그인" fullWidth />
      </form>
      <div className={cx('error', 'red', { hidden: !isLoginFailed })}>
        아이디 혹은 비밀번호를 다시 확인해 주세요.
      </div>
    </div>
  );
}

export default LoginPage;
