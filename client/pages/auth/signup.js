import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';
import AuthForm from '../../components/auth-form';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <AuthForm
      signUp
      onSubmit={onSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      errors={errors}
    />
  );
};
