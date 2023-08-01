import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./profile.css";
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleSignOut = async () => {
        try {
            await logout()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex justify-between bg-gray-200 w-full p-4'>
            <h1 className='text-center text-2xl font-bold'>
                Firebase Google Auth & Context
            </h1>
            {user?.displayName ? (
                <div style={{display: "flex"}}>
                    <a className='home-btn' href="/">Home &nbsp;&nbsp;&nbsp;</a>
                    <Link to="/profile">
                        <img src={user.photoURL} style={{ borderRadius: "50%", maxHeight: "30px", marginRight: "20px"}} />
                    </Link>
                    <button style = {{fontSize:"18px"}}  onClick={handleSignOut}>LogOut</button>
                </div>
            ) : (
                <Link to='/signin'>Sign In</Link>
            )}
        </div>
    );
}

export default Navbar;