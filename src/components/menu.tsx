import React from 'react';
import BurgerMenu from './icons/burger-menu';
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useTranslation } from '../app/i18n/'


interface MenuProps {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
    lng: string
}

const Menu: React.FC<MenuProps> = async ({ isMobileMenuOpen, toggleMobileMenu, lng }) => {
    const router = useRouter()
    const path = usePathname()
    const { t } = await useTranslation(lng, 'common')

    const generateLanguageSwitchLink = () => {
        if (path === '/en') {
            return '/pt';
        } else if (path === '/pt') {
            return '/en';
        } else if (lng === 'en') {
            return path.replace('/en/', '/pt/');
        } else {
            return path.replace('/pt/', '/en/');
        }
    };

    const handleNavigation = (path: string) => {
        router.push(`/${lng}/${path}`);
    };

    return (
        <div className="h-full">
            <nav className="hidden md:block">
                <ul className="flex pt-10 gap-10 lg:gap-40">
                    <li className='h-10 flex flex-row items-center cursor-pointer' onClick={() => handleNavigation('/exhibitions')}>{t("exhibitions")}</li>
                    <li className='h-10 flex flex-row items-center cursor-pointer' onClick={() => handleNavigation('/artists')}>{t("artists")}</li>
                    <li className='h-10 flex flex-row items-center cursor-pointer' onClick={() => handleNavigation('/contacts')}>{t("contacts")}</li>
                    {/* <li className='h-10 flex flex-row items-center hover:text-gray-900'>Pesquisa</a></li> */}
                    <li className='h-10 flex flex-row items-center'><Link href={generateLanguageSwitchLink()} className='"hover:text-gray-900"'>{lng === 'en' ? "PT" : "EN"}</Link></li>
                </ul>
            </nav>
            <div className="flex md:hidden items-center h-full">
                <button onClick={toggleMobileMenu}>
                    <BurgerMenu />
                </button>
            </div>
            {/*{isMobileMenuOpen && (
                <nav className="md:hidden">
                    <ul className="flex flex-col items-center space-y-2 mt-4">
                        <li><a href="/exhibitions" className="hover:text-gray-900">{t("exhibitions")}</a></li>
                        <li><a href="/artistas" className="hover:text-gray-900">{t("artists")}</a></li>
                        <li><a href="/contactos" className="hover:text-gray-900">{t("contacts")}</a></li>
                        <li><a href="/pesquisa" className="hover:text-gray-900">Pesquisa</a></li>
                        <li><a className="hover:text-gray-900">EN</a></li>
                    </ul>
                </nav>
            )} */}
        </div >
    );
};

export default Menu;
