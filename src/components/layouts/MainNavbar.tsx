import {FC} from "react";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers";
import {logoutUser} from "../../redux/actions/auth";
import {useRouter} from "next/router";
import styles from "../../styles/Navbar.module.scss";


export const MainNavbar: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const logout = () => dispatch(logoutUser());

  return (
    <header className={styles.navbar}>
      <Link href="/">
        <a className={router.pathname === '/' ? styles.active : ''}>Home</a>
      </Link>

      {isAuthenticated ? (
        <>
          <Link href="/dashboard">
            <a className={router.pathname === '/dashboard' ? styles.active : ''}>Dashboard</a>
          </Link>

          <Link href="">
            <a onClick={logout}>Logout</a>
          </Link>
        </>
      ) : (
        <>
          <Link href="/login">
            <a className={router.pathname === '/login' ? styles.active : ''}>Login</a>
          </Link>

          <Link href="/register">
            <a className={router.pathname === '/register' ? styles.active : ''}>Register</a>
          </Link>
        </>
      )}
    </header>
  );
};

export default MainNavbar;
