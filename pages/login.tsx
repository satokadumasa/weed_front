import Head from 'next/head';
import axios from 'axios';
import { useState } from 'react';
import { Container, Button, Form, Image } from 'react-bootstrap';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';

interface ILogin {
  userName: string;
  password: string;
}

const initialPayload: ILogin = {
  userName: '',
  password: '',
};

const Login = () => {
  const router = useRouter();

  const [payload, setPayload] = useState<ILogin>(initialPayload);

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const onClickLogin = () => {
    axios
      .post('/api/login', payload)
      .then((res) => {
        console.log("onClickLogin success.")
        // ログインフラグをクッキーへ、「auth」というキーで登録
        setCookie(null, 'auth', 'true', {
          maxAge: 30 * 24 * 60 * 60, // お好きな期限を
          path: '/',
        });
        router.push('/');
      })
      .catch((e) => {
        console.log("onClickLogin false.")
        console.log('認証エラー');
      });
  };
  return (
    <Container>
      <Head>
        <title>ログイン画面例</title>
      </Head>
      <div className='login-container'>
        <Image
          src='https://placehold.jp/150x150.png'
          roundedCircle
          style={{ marginBottom: '20px' }}
        />
        <Form.Control
          type='text'
          placeholder='User Name'
          name='userName'
          value={payload.userName}
          onChange={handleChange}></Form.Control>
        <Form.Control
          type='password'
          placeholder='Password'
          name='password'
          value={payload.password}
          onChange={handleChange}></Form.Control>
        <Button variant='info' type='button' onClick={onClickLogin}>
          Login
        </Button>
      </div>
    </Container>
  );
};

export default Login;