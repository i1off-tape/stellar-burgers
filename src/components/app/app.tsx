import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
  useMatch
} from 'react-router-dom';
import { Modal } from '@components';
import { IngredientDetails, OrderInfo } from '@components';
import { useSelector, useDispatch } from '../../services/store';
import { userSelectors, userActions } from '../../services/slices/userSlice';
import { fetchUser } from '../../services/thunks/userThunk';
import { useEffect } from 'react';
import { AppHeader } from '@components';
import { Preloader } from '@ui';
import { only } from 'node:test';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(userSelectors.userSelect);
  const isAuthChecked = useSelector(userSelectors.isAuthCheckedSelect);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && user) {
    return <Navigate replace to='/' />;
  }

  return <>{children}</>;
};

//Модалка
const ModalSwitch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  const dispatch = useDispatch();
  const isChecked = useSelector(userSelectors.isAuthCheckedSelect);

  useEffect(() => {
    if (!isChecked && localStorage.getItem('refreshToken')) {
      dispatch(fetchUser());
    } else if (!localStorage.getItem('refreshToken')) {
      dispatch(userActions.setUserCheck());
    }
  }, [dispatch, isChecked]);

  const handleClose = () => {
    navigate(-1);
  };

  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  return (
    <>
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                onClose={handleClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={`#${orderNumber && orderNumber.padStart(6, '0')}`}
                  onClose={handleClose}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};

const App = () => (
  <div className={styles.app}>
    <Router>
      <AppHeader />
      <ModalSwitch />
    </Router>
  </div>
);

export default App;
