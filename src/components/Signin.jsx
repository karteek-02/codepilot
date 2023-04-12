import React from 'react'
import { useContext } from 'react';
import { GoogleButton } from 'react-google-button';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Signin = () => {

    // const {googleSignIn} = UserAuth();
    const { googleSignIn, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user != null) {
            navigate('/');
        }
    }, [user])

    return (
        <div>
            <h1 className='text-center text-3xl font-bold py-8'>Sign In</h1>
            <div className='max-w-[240px] m-auto py-4'>
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>
        </div>
    );
}

export default Signin; 