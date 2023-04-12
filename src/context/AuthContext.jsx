import { useContext, createContext } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged, updateCurrentUser, getAdditionalUserInfo } from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";


const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // const { isNewUser } = getAdditionalUserInfo(result)
                // const userId = result.user.uid
                const docRef = query(collection(db, "users"), where("email", "==", result.user.email));
                const results = await getDocs(docRef);

                if (results.docs.length === 0) {
                    const docRef = await addDoc(collection(db, "users"), {
                        email: result.user.email,
                        name: result.user.displayName,
                    });
                    console.log(docRef.id);
                }
            })
    };

    const logout = () => {
        signOut(auth);
        window.location.href="/";
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('user', currentUser);
        });
        return () => {
            unsubscribe()
        }
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logout, user }}>
            {children}
        </AuthContext.Provider>
    )
}

// export const UserAuth = () => {
//     return useContext(AuthContext)
// }
export { AuthContext, AuthContextProvider };