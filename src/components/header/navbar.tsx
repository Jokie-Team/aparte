import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Divider } from "../Divider";
import clsx from "clsx";

type NavItem = {
  path: string;
  translationKey: string;
};

type NavbarProps = {
  isMobileMenuOpen?: boolean;
  isMobile?: boolean;
  onClick?: () => void;
};

const NAV_ITEMS: NavItem[] = [
  { path: "/exhibitions", translationKey: "exhibitions" },
  { path: "/artists", translationKey: "artists" },
/*   { path: "/contacts", translationKey: "contacts" },
 */];

const Navbar = ({
  isMobile = false,
  isMobileMenuOpen = false,
  onClick,
}: NavbarProps) => {
  const pathname = usePathname();
  const t = useTranslations("menu");
  const currentLocale = useLocale();
  const otherLocale = currentLocale === "en" ? "pt" : "en";

  const localizedPathname = (locale: string | undefined) => {
    if (pathname === `/${currentLocale}`) {
      return `/${locale}`;
    }
    return pathname.replace(`/${currentLocale}`, `/${locale}`);
  };

  const normalizedPathname = pathname.replace(`/${currentLocale}`, "");

  const navStyles = {
    nav: clsx("md:p-10 transition-all duration-300", {
      "block md:hidden h-full": isMobile && isMobileMenuOpen,
      "hidden md:hidden h-14": isMobile && !isMobileMenuOpen,
      "hidden md:block": !isMobile && !isMobileMenuOpen,
    }),
    list: clsx("flex gap-40 relative w-full", {
      "flex-col gap-y-1 flex-start": isMobileMenuOpen,
      "items-center h-full": !isMobileMenuOpen,
    }),
    item: clsx("transition-all duration-200 hover:opacity-80", {
      "p-1": isMobileMenuOpen,
    }),
    activeLink: "font-extrabold",
  };

  const renderNavItem = ({ path, translationKey }: NavItem) => (
    <div key={path}>
      <li className={navStyles.item} onClick={onClick}>
        <Link href={`/${currentLocale}${path}`}>
          <span
            className={clsx({
              [navStyles.activeLink]: normalizedPathname === path,
            })}
          >
            {t(translationKey)}
          </span>
        </Link>
      </li>
      {isMobileMenuOpen && <Divider />}
    </div>
  );

  return (
    <nav className={navStyles.nav}>
      <ul className={navStyles.list}>
        {NAV_ITEMS.map(renderNavItem)}
        <li className={navStyles.item}>
          <Link href={localizedPathname(otherLocale)} locale={false}>
            <span>{otherLocale.toUpperCase()}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export { Navbar };
