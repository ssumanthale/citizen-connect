import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  const [loading, setLoading] = useState(true);

  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [last24H, setLast24H] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("🔥 User In => ", user.email);

        setIsAuthenticated(true);
        setUser({ ...user, id: user.uid });
        fetchUser(user.uid);
      } else {
        console.log("😓 Not Auth");

        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (!user) return;

    const querySnapshot = collection(db, "story");

    const unsub = onSnapshot(querySnapshot, (snapshot) => {
      const story = [];
      const last24H = [];
      snapshot.forEach((doc) => {
        if (doc.data().date > Date.now() - 86400000) {
          last24H.push({
            ...doc.data(),
            id: doc.id,
            profileUrl:
              doc.data().userId === user?.id
                ? user?.profileUrl
                : doc.data().profileUrl,
          });
        }
        story.push({
          ...doc.data(),
          id: doc.id,
          profileUrl:
            doc.data().userId === user?.id
              ? user?.profileUrl
              : doc.data().profileUrl,
        });
      });
      setStories(story);
      setLast24H(last24H);
    });
    return () => {
      unsub();
    };
  }, [user]);
  useEffect(() => {
    if (!user) return;

    const querySnapshot = collection(db, "posts");

    const unsub = onSnapshot(querySnapshot, (snapshot) => {
      const posts = [];
      snapshot.forEach((doc) => {
        posts.push({
          ...doc.data(),
          id: doc.id,
          profileUrl:
            doc.data().userId === user?.id
              ? user?.profileUrl
              : doc.data().profileUrl,
        });
      });
      setPosts(posts);
    });
    return () => {
      unsub();
    };
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const querySnapshot = collection(db, "users", user.id, "notifications");

    const unsub = onSnapshot(querySnapshot, (snapshot) => {
      const notification = [];
      snapshot.forEach((doc) => {
        notification.push({ ...doc.data(), id: doc.id });
      });
      setNotifications(notification);
    });
    return () => {
      unsub();
    };
  }, [user]);

  // Sign up a new user
  const register = async (email, password, name) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("🔥 New User => ", response?.user);
      // create a new user in the database with the response.user.uid if you want more details
      await setDoc(doc(db, "users", response?.user.uid), {
        email,
        id: response?.user.uid,
        username: email.split("@")[0],
        name,
        phone: "",
        bio: "",
        profileUrl: "https://picsum.photos/seed/11/3000/2000",
      });
      return { success: true, user: response?.user };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  // Sign in an existing user
  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: response?.user };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  // Sign out the current user
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  //password reset function firebase

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (e) {
      const msg = handleFirebaseError(e);
      return { success: false, msg };
    }
  };

  const fetchUser = async (uid) => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.error("No such document!");
    }
  };

  // Provide the AuthContext value to the children components
  const authContextValue = {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
    resetPassword,
    posts,
    stories,
    notifications,
    last24H,
    setUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return value;
};

const handleFirebaseError = (error) => {
  console.error(error);
  let msg = error.message;
  if (msg.includes("auth/email-already-in-use")) {
    msg = "Email already in use";
  } else if (msg.includes("auth/invalid-email")) {
    msg = "Invalid email";
  } else if (msg.includes("auth/weak-password")) {
    msg = "Password should be at least 6 characters";
  } else if (msg.includes("auth/user-not-found")) {
    msg = "User not found";
  } else if (msg.includes("auth/wrong-password")) {
    msg = "Wrong password";
  } else if (msg.includes("auth/too-many-requests")) {
    msg = "Too many requests, please try again later";
  } else if (msg.includes("auth/network-request-failed")) {
    msg = "Network request failed, please try again later";
  }

  return msg;
};
