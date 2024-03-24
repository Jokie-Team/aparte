import React from 'react';
import BurgerMenu from './images/burgerMenu';

// Define an interface for your component's props
interface MenuProps {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void; // This assumes toggleMobileMenu is a function that returns void
}

const Menu: React.FC<MenuProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {

    return (
        <div className="h-full">
            <nav className="hidden md:block">
                <ul className="flex pt-10 gap-40 pr-10">
                    <li className='h-10 flex flex-row items-center'><a href="/exposicoes" className="text-gray-700 hover:text-gray-900">Exposições</a></li>
                    <li className='h-10 flex flex-row items-center'><a href="/artistas" className="text-gray-700 hover:text-gray-900">Artistas</a></li>
                    <li className='h-10 flex flex-row items-center'><a href="/contactos" className="text-gray-700 hover:text-gray-900">Contactos</a></li>
                    <li className='h-10 flex flex-row items-center'><a href="/pesquisa" className="text-gray-700 hover:text-gray-900">Pesquisa</a></li>
                    <li className='h-10 flex flex-row items-center'><a className="text-gray-700 hover:text-gray-900">EN</a></li>
                </ul>
            </nav>
            <button className="md:hidden" onClick={toggleMobileMenu}>
                <BurgerMenu />
            </button>
            {isMobileMenuOpen && (
                <nav className="md:hidden">
                    <ul className="flex flex-col items-center space-y-2 mt-4">
                        <li><a href="/exposicoes" className="text-gray-700 hover:text-gray-900">Exposições</a></li>
                        <li><a href="/artistas" className="text-gray-700 hover:text-gray-900">Artistas</a></li>
                        <li><a href="/contactos" className="text-gray-700 hover:text-gray-900">Contactos</a></li>
                        <li><a href="/pesquisa" className="text-gray-700 hover:text-gray-900">Pesquisa</a></li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Menu;
