import {FC} from "react";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import styles from "../../styles/Navbar.module.scss";
import {useAppSelector} from "../../redux/hooks";
import {logoutUser} from "../../redux/actions/auth";


export const MainNavbar: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

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
