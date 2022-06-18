import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

import en from "../../../locale/en";
import es from "../../../locale/es";

const Navbar = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : es;

  const changeLanguage = (e) => {
    const locale = e.target.value;
    console.log(router.pathname);
    console.log(router.asPath);
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <select
            onChange={changeLanguage}
            defaultValue={locale}
            className="text-white text-shadow-sm text-lg bg-transparent tracking-wide"
          >
            <option className="text-black" value="en">
              EN
            </option>
            <option className="text-black" value="es">
              ES
            </option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
