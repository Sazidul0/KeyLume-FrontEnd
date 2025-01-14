import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../../images/PasswordManager.png'

const Navbar = () => {

    const menuItems = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/managePass'>Manage Password</Link></li>
        <li><Link to='/passwordGenerate'>Generate Password</Link></li>
        <li><Link to='/breachCheck'>Breach Check</Link></li>
        <li><Link to='/strengthCheck'>Strength Check</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/login'>LogIn</Link></li>



    </>

    return (
        <div>
            <div className="navbar  bg-neutral">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost normal-case text-xl " to='/'>
                        <img className='w-10' src={icon} alt="Tools Icon" /><h3 className='website-name text-3xl text-white'>KeyLume</h3>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex ">
                    <ul className="menu menu-horizontal p-0 text-white">
                        {menuItems}
                    </ul>
                </div>



                {/* <div className="navbar-end">
                    <label tabIndex="1" htmlFor="dashboard-sidebar" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>

                </div> */}


            </div>
            {/* <div style={{ height: '8px' }} className='bg-black'></div> */}
        </div>
    );
};

export default Navbar;
