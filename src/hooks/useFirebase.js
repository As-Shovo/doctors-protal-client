import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, getIdToken, updateProfile, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';
import initializeFirebase from "../Pages/Firebase/firebase.init";

// initializeFirebase app () 
initializeFirebase();


const useFirebase = () => {

    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const [isLoading, setIsloading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState("");




    const auth = getAuth();


    // Email Password Register

    const emailPasswordRegister = (email, password, name, history) => {
        setIsloading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {


                // Redirect

                history.replace('/');

                //update profile

                const newUser = { email, displayName: name };
                setUser(newUser);

                //save user to the database
                svaeUser(email, name, "POST");



                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });

                setUser(result.user);
                setError('')
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsloading(false));
    }

    // Email Password login

    const emailPasswordLogingUser = (email, password, location, history) => {
        setIsloading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {

                //redirect 
                const destination = location?.state.from || '/';
                history.replace(destination);


                // Signed in 
                setUser(result.user);
                setError('');
            })
            .catch((error) => {

                setError(error.message);
            })
            .finally(() => setIsloading(false));


    }

    // Google signin 
    const singInWithGoogle = (location, history) => {
        const googleAuthProvider = new GoogleAuthProvider();

        setIsloading(true);
        signInWithPopup(auth, googleAuthProvider)
            .then(result => {

                // Redirect  
                const destination = location?.state.from || '/';
                history.replace(destination);

                const googleUser = result.user;

                // save user to the database

                svaeUser(googleUser.email, googleUser.displayName, "PUT")


                setUser(googleUser);
                setError('')
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsloading(false));
    }



    // send user Data base 
    const svaeUser = (email, displayName, method)=>{
            const user = {email, displayName};

            fetch('http://localhost:5000/users',{
                method: method,
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
    };

    // update data login in google 





    // manage user Observe user State  

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setError('');

                getIdToken(user)
                .then(idToken =>{
                    setToken(idToken);
                })
            } else {
                setUser({})
            }
            setIsloading(false)
        });

        return () => unsubscribe;
    }, []);

    useEffect(()=>{
        fetch(`http://localhost:5000/user/${user.email}`)
        .then(res => res.json())
        .then(data =>{
            setAdmin(data.admin)
        })
    },[user.email])




    const logOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                setUser({})
                setError('')
            })
            .catch((error) => {
                // An error happened.
                setError(error.message)
            })
            .finally(() => setIsloading(false));
    }

    return {
        user,
        logOut,
        token,
        error,
        emailPasswordRegister,
        isLoading,
        emailPasswordLogingUser,
        singInWithGoogle,
        admin
    }



}

export default useFirebase;