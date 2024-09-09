import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const NavBar = () => {
    const [user] = useAuthState(auth);

    const signout = async () => {
        await signOut(auth);
    };

    return (
        <div className="navbar">
            <div className="links">
                <Link to="/">Home</Link>
                {!user ? (<Link to="/login">Login</Link>) : <Link to="/create-post"> Create Pots</Link>}

            </div>
            <div className="user">
                {user ? (
                    <>
                        <p>{user.displayName}</p>
                        <img
                            src={user.photoURL || "/default-avatar.png"}
                            width="50"
                            height="50"
                            alt="User Avatar"
                        />
                        <button className="signout-button" onClick={signout}>
                            Sign Out
                        </button>
                    </>
                ) : (
                    <p>Not signed in</p>
                )}
            </div>
        </div>
    );
};
