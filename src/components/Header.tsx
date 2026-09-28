"use client";

import Link from "next/link";
import { useState } from "react";
import { navItems, siteConfig } from "@/lib/config";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label={`${siteConfig.name} home`}>
        <span className="brand-mark" aria-hidden="true">
          CV
        </span>
        <span>{siteConfig.name}</span>
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
      </button>
      <nav
        id="site-navigation"
        className={open ? "nav nav-open" : "nav"}
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link className="nav-cta" href={siteConfig.ctas.assessment} onClick={() => setOpen(false)}>
          Request a Security Assessment
        </Link>
      </nav>
    </header>
  );
}
