import React from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import Button from '../../components/Button';

interface LoginForm {
  id: number;
  password: string;
}

const cx = classNames.bind(styles);

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    // will be executed when submit event happens
  };

  return (
    <div className={cx('container')}>
      <h1>Yonsei space system</h1>
      <h5>연세포탈 아이디와 비밀번호를 입력하세요.</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('id', {
            pattern: {
              value: /[0-9]{10}/,
              message: '올바른 아이디를 입력하세요.',
            },
          })}
          placeholder="학번 10자리"
        />
        <div className={cx('error', { hidden: !errors.id })}>
          {errors.id?.message}
        </div>
        <input
          {...register('password', { required: '비밀번호를 입력하세요' })}
          placeholder="비밀번호"
          type="password"
        />
        <div className={cx('error', { hidden: !errors.password })}>
          {errors.password?.message}
        </div>
        <Button fullWidth>로그인</Button>
      </form>
    </div>
  );
}

export default LoginPage;
