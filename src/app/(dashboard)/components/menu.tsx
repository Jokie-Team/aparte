import React from 'react';
import BurgerMenu from './assets/icons/burger-menu';
import { useRouter } from 'next/navigation'

// Define an interface for your component's props
interface MenuProps {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
}

const Menu: React.FC<MenuProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
    const router = useRouter()

    const handleNavigation = (path: string) => {
        router.prefetch(path);
        router.push(path);
    };

    return (
        <div className="h-full">
            <nav className="hidden md:block">
                <ul className="flex pt-10 gap-20 lg:gap-40">
                    <li className='h-10 flex flex-row items-center cursor-pointer' onClick={() => handleNavigation('/exhibitions')}>Exposições</li>
                    <li className='h-10 flex flex-row items-center cursor-pointer' onClick={() => handleNavigation('/artists')}>Artistas</li>
                    <li className='h-10 flex flex-row items-center cursor-pointer' onClick={() => handleNavigation('/contacts')}>Contactos</li>
                    {/* <li className='h-10 flex flex-row items-center hover:text-gray-900'>Pesquisa</a></li> */}
                    <li className='h-10 flex flex-row items-center'><a className="hover:text-gray-900">PT</a></li>
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
                        <li><a href="/exposicoes" className="hover:text-gray-900">Exposições</a></li>
                        <li><a href="/artistas" className="hover:text-gray-900">Artistas</a></li>
                        <li><a href="/contactos" className="hover:text-gray-900">Contactos</a></li>
                        <li><a href="/pesquisa" className="hover:text-gray-900">Pesquisa</a></li>
                        <li><a className="hover:text-gray-900">EN</a></li>
                    </ul>
                </nav>
            )} */}
        </div >
    );
};

export default Menu;
