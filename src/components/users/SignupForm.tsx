import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { app } from 'firebaseApp';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignupForm() {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const navigate = useNavigate();

  const onClickSocialLogin = async (e: any) => {
    const {
      target: { name },
    } = e;
    let provider;
    const auth = getAuth(app);
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }
    if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(
      auth,
      provider as GithubAuthProvider | GoogleAuthProvider
    )
      .then((result) => {
        toast.success('로그인 되었습니다.');
      })
      .catch((error) => {
        console.log(error);
        const errorMessage = error?.message;
        toast.error(errorMessage);
      });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, passwordConfirm);

      toast.success('회원가입에 성공했습니다.');
      navigate('/');
    } catch (error: any) {
      toast.error(error?.code);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
      setEmail(value);
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!value?.match(validRegex)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }
    if (name === 'password') {
      setPassword(value);
      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해주세요.');
      } else if (passwordConfirm?.length > 0 && passwordConfirm !== value) {
        setError('비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.');
      } else {
        setError('');
      }
    }

    if (name === 'password_confirm') {
      setPasswordConfirm(value);
      if (value?.length < 8) {
        setError('비밀번호는 8자리 이상으로 입력해주세요.');
      } else if (password !== value) {
        setError('비밀번호와 비밀번호 확인 값이 다릅니다. 다시 확인해주세요.');
      } else {
        setError('');
      }
    }
  };
  return (
    <form onSubmit={onSubmit} className='form form--lg'>
      <h1 className='form__title'>회원가입</h1>
      <div className='form__block'>
        <label htmlFor='email'>이메일</label>
        <input
          onChange={onChange}
          type='email'
          name='email'
          id='email'
          required
        />
      </div>
      <div className='form__block'>
        <label htmlFor='password'>비밀번호</label>
        <input
          onChange={onChange}
          type='password'
          name='password'
          id='password'
          required
        />
      </div>
      <div className='form__block'>
        <label htmlFor='password'>비밀번호 확인</label>
        <input
          onChange={onChange}
          type='password'
          name='password_confirm'
          id='password_confirm'
          required
        />
      </div>
      {error && error?.length > 0 && (
        <div className='form__block'>
          <div className='form__error'>{error}</div>
        </div>
      )}
      <div className='form__block'>
        계정이 이미 없으신가요?
        <Link to='/login' className='form__link'>
          로그인하기
        </Link>
      </div>
      <div className='form__block'>
        <input
          type='submit'
          value='회원가입'
          className='form__btn--submit'
          disabled={error?.length > 0}
        />
      </div>
      <div className='form__block'>
        <button
          type='button'
          name='google'
          className='form__btn--google'
          onClick={onClickSocialLogin}>
          Google로 회원가입
        </button>
      </div>
      <div className='form__block'>
        <button
          type='button'
          name='github'
          className='form__btn--github'
          onClick={onClickSocialLogin}>
          Github으로 회원가입
        </button>
      </div>
    </form>
  );
}
