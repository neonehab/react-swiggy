import { Link, NavLink } from "react-router-dom";
import styles from "../../css/header.module.css";
import useCurrentLocation from "../../data/useCurrentLocation";

const Header = () => {
  const { label, loading, error } = useCurrentLocation();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img
            src="https://via.placeholder.com/100x40?text=Logo"
            alt="My App Logo"
          />
        </div>
        <div
          className={styles.location}
          title={error ? `Using default location (${error})` : label}
        >
          <span className={styles.locationIcon} aria-hidden="true">
            📍
          </span>
          <span className={loading ? styles.locationLoading : styles.locationText}>
            {label}
          </span>
        </div>
      </div>

      <nav className={`${styles.navbar} ${styles.active}`}>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Account</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
