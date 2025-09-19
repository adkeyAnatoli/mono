"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import headerLogo from "../../../../public/images/logo.webp";
import styles from "./header.module.css";
import { useGetRootDataQuery } from "@/app/redux/slice/api";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setOpen] = useState(false);
  const { data: siteData } = useGetRootDataQuery("");
  const pathname = usePathname();

  return (
    <header className={`${styles.header} container`}>
      <div>
        <Link href={"/"} aria-label="Main page">
          <Image
            className={`${styles.header__logo} logo`}
            src={headerLogo}
            alt={"Coral Casino UK"}
            priority
          />
        </Link>
      </div>
      <div className={`${styles.nav__block}`}>
        <ul className={`${styles.nav__list} nav__list ${isOpen ? "open" : ""}`}>
          <li className={`${styles.nav__item} `}>
            <Link
              className={`${styles.nav__link} ${pathname === "/games" ? styles.active : ""}`}
              href="/games"
              aria-label="Games"
              onClick={() => setOpen(false)}
              prefetch={true}
            >
              Games
            </Link>
          </li>
          <li className={`${styles.nav__item}`}>
            <Link
              className={`${styles.nav__link}  ${pathname === "bonus" ? styles.active : ""} `}
              href="/bonus"
              aria-label="Bonus"
              onClick={() => setOpen(false)}
              prefetch={true}
            >
              Bonus
            </Link>
          </li>
          <li className={`${styles.nav__item} `}>
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
          <li className={`${styles.nav__item}`}>
            <Link
              className={`${styles.nav__link}  ${pathname === "/login" ? styles.active : ""}`}
              href="/login"
              aria-label="Log in"
              onClick={() => setOpen(false)}
              prefetch={true}
            >
              Log In
            </Link>
          </li>
        </ul>
        <Link
          href={siteData ? `/casino/${siteData.offers[0].id}` : "/"}
          aria-label="Play game"
        >
          <span className={`btn`}>Play Now</span>
        </Link>
      </div>
      <div
        className={`hamburger ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
      ></div>
    </header>
  );
}
