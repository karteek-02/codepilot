import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import "./profile.css";
import Editor from "@monaco-editor/react";

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [codes, setCodes] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCodes = () => {
            try {
                const l = [];
                const q = query(collection(db, "users"), where("email", "==", user.email));
                onSnapshot(q, (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.data().savedCodes?.forEach((item) => {
                            l.push({ code: item.code, language: item.language.value });
                        });
                        setCodes(l);
                    });
                });
            } catch (err) {
                console.log(err);
            }
        };
        user && getCodes();
        setLoading(false);
        // console.log(codes);
    }, [user, codes])

    if (loading || !user) return (<>Loading....</>)

    return (
        <div className='user-profile'>
            <div className='user-details'>
                <div>Profile</div>
                <div>Name: {user.displayName}</div>
                <div>E-mail: {user.email}</div>
            </div>
            <div className='user-code'><ul>
                {codes?.map((code, i) => {
                    return (
                        // <li key={i}>{code.code}</li>
                        <li key={i} >
                            <br /><br />
                            <div className='code-number'>Code : {(i +1)}</div>
                            <Editor
                                height="80vh"
                                width={`70%`}
                                language={code.language}
                                value={code.code}
                                theme={'vs-dark'}
                            />
                        </li>
                    )
                })}
            </ul></div>
        </div>
    )
}

export default Profile;


// console.log("Document written with ID: ", newDoc.id);