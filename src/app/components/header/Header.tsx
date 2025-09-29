"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import headerLogo from "../../../../public/images/logo.webp";
import styles from "./header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className={`${styles.header} container`}>
      <div className={styles.header__block}>
        <Link href={"/"} aria-label="Main page">
          <Image
            className={`${styles.header__logo} logo`}
            src={headerLogo}
            alt={"Crown Casino Melbourne Online"}
            priority
          />
        </Link>
      </div>
      <ul className={`${styles.nav__list} nav__list ${isOpen ? "open" : ""}`}>
        <li className={styles.nav__item}>
          <Link
            className={`${styles.nav__link} ${pathname === "/app" ? styles.active : ""}`}
            href="/app"
            aria-label="App"
            onClick={() => setOpen(false)}
            prefetch={true}
          >
            App
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link
            className={`${styles.nav__link} ${pathname === "/login" ? styles.active : ""}`}
            href="/login"
            aria-label="Login"
            onClick={() => setOpen(false)}
            prefetch={true}
          >
            Login
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link
            className={`${styles.nav__link} ${pathname === "/online" ? styles.active : ""}`}
            href="/online"
            aria-label="Online"
            onClick={() => setOpen(false)}
            prefetch={true}
          >
            Online
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link
            className={`${styles.nav__link} ${pathname === "/bonus" ? styles.active : ""}`}
            href="/bonus"
            aria-label="Bonus"
            onClick={() => setOpen(false)}
            prefetch={true}
          >
            Bonus
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link
            className={`${styles.nav__link} ${pathname === "/pokies" ? styles.active : ""}`}
            href="/pokies"
            aria-label="Pokies"
            onClick={() => setOpen(false)}
            prefetch={true}
          >
            Pokies
          </Link>
        </li>
      </ul>
      <div
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
      ></div>
    </header>
  );
}
