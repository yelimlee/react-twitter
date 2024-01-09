import { ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsHouse } from 'react-icons/bs';
import { MdLogout, MdLogin } from 'react-icons/md';
import { BiUserCircle } from 'react-icons/bi';
import AuthContext from 'context/AuthContext';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { app } from 'firebaseApp';
interface LayoutProps {
  children: ReactNode;
}

export default function MenuList() {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <div className='footer'>
      <div className='footer__grid'>
        <button type='button' onClick={() => navigate('/')}>
          <BsHouse />
          Home
        </button>
        <button type='button' onClick={() => navigate('/profile')}>
          <BiUserCircle />
          Profile
        </button>
        {user === null ? (
          <>
            <button type='button' onClick={() => navigate('/users/login')}>
              <MdLogin />
              Login
            </button>
          </>
        ) : (
          <>
            <button
              type='button'
              onClick={async () => {
                const auth = getAuth(app);
                await signOut(auth);
                toast.success('로그아웃 되었습니다.');
              }}>
              <MdLogout />
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
