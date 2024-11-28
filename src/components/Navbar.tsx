import { Key, Menu, Settings, Shield, Users, X } from 'lucide-react';
import React, { useState } from 'react'
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

type MenuItem = {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick: () => void;
}

const MenuItem: React.FC<MenuItem> = ({icon: Icon, label, active, onClick}) => {
    return (
        <button onClick={onClick} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
            active
             ? "bg-indigo-50 text-indigo-600 dark:bg-gray-800 dark:text-indigo-400"
             : "text-gray-600 hover:bg-gray-50 dark:bg-gray-400 dark:hover:bg-gray-800"}`}>
            <Icon className="w-5 h-5"/>
            <span className='font-medium'>{label}</span>
        </button>
    );
}
// const MenuItem: React.FC<MenuItem> = ({icon: Icon, label, active, onClick}) => {
//     <button onClick={onClick} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
//         active
//          ? "bg-indigo-50 text-indigo-600 dark:bg-gray-800 dark:text-indigo-400"
//          : "text-gray-600 hover:bg-gray-50 dark:bg-gray-400 dark:hover:bg-gray-800"}`}>
//         <Icon className="w-5 h-5"/>
//         <span className='font-medium'>{label}</span>
//     </button>
// }

const Navbar: React.FC<SidebarProps> = ({activeView, onViewChange}) => {
    const [isMobileMenu, setIsMobileMenu] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenu(!isMobileMenu);

    const MenuContent = (
        <>
            <nav>
                <MenuItem icon={Users} label='Users' active={activeView === 'users'} onClick={()=>{
                    onViewChange('users');
                    setIsMobileMenu(false);
                }}/>
                <MenuItem icon={Shield} label='Roles' active={activeView === 'roles'} onClick={()=>{
                    onViewChange('roles');
                    setIsMobileMenu(false);
                }}/>
                <MenuItem icon={Key} label='Permissions' active={activeView === 'permissions'} onClick={()=>{
                    onViewChange('permissions');
                    setIsMobileMenu(false);
                }}/>
                <MenuItem icon={Settings} label='Settings' active={activeView === 'settings'} onClick={()=>{
                    onViewChange('settings');
                    setIsMobileMenu(false);
                }}/>
            </nav>
            <div className='mt-auto'>
                <ThemeToggle/>
            </div>
        </>
    )

    return (
        <>
            {/* Mobile menu button */}
            <div className='lg:hidden fixed top-0 first-letter left-0 right-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-3'>
                        <Shield className='w-6 h-6 text-indigo-600 dark:text-indigo-400'/>
                        <span className='text-lg font-bold text-gray-600 dark:text-white'>RBAC Admin</span>
                    </div>
                    <button 
                        onClick={toggleMobileMenu}
                        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
                        >
                        {isMobileMenu ? (
                            <X className='w-6 h-6'/>
                            )
                            : (
                            <Menu className='w-6 h-6 '/>
                            )
                        }
                    </button>
                </div>
            </div>
            {/* Mobile menu overlay */}
            { isMobileMenu && (
                <div className='lg:hidden fixed inset-0 z-10 bg-black bg-opacity-50' onClick={toggleMobileMenu}/>
            )}
            {/* Mobile Menu */}
            <div className={`lg:hidden inset-0 top-14 fixed bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out z-10 ${
                isMobileMenu ? 'translate-x-0' : '-translate-x-full'}` }>
                <div className='flex flex-col h-full p-4'>
                    {MenuContent}
                </div>
            </div>
            {/* Desktop menu */}
            <div className="hidden lg:flex lg:flex-col w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center space-x-3 px-4 py-5">
                    <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">RBAC Admin</h1>
                </div>
                {MenuContent}
            </div>
        </>
    )
}

export default Navbar