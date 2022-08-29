import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginCompletedState } from '../atom';

function useCheckLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginComplete = useRecoilValue(isLoginCompletedState);

  useEffect(() => {
    if (location.pathname === '/' && !isLoginComplete) {
      navigate('/login', { replace: true });
    } else if (location.pathname === '/login' && isLoginComplete) {
      navigate('/', { replace: true });
    }
  }, [navigate, location, isLoginComplete]);
}

export default useCheckLogin;
