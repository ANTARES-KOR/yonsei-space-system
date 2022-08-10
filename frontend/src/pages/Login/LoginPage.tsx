import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './LoginPage.module.scss';
import Button from '../../components/Button';

interface LoginForm {
  id: number;
  password: string;
}

function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const onSubmit = (data: LoginForm) => {
    // will be executed when submit event hap pens
    console.log(data);
  };

  return (
    <div>
      <h1>Yonsei space system</h1>
      <p>연세포탈 아이디와 비밀번호를 입력하세요.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('id')} placeholder="id" />
        <input
          {...register('password')}
          placeholder="password"
          type="password"
        />
        <Button fullWidth>로그인</Button>
      </form>
      <Link to="/">Main</Link>
    </div>
  );
}

export default LoginPage;
