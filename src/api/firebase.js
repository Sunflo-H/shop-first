import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { v4 as uuid } from "uuid";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase(app);

// 매번 로그인 할 때마다 유저를 선택하는 옵션
provider.setCustomParameters({
  prompt: "select_account",
});

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

// * 수정 후 코드
export function onUserStateChange(setUser) {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user && (await isAdmin(user));
    setUser(updateUser);
  });
}

async function isAdmin(user) {
  try {
    const snapshot = await get(ref(db, `admins/`));
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    } else return user;
  } catch (error) {
    console.error(error);
  }
}

export function uploadNewProduct(product, imageUrl) {
  const id = uuid();
  return set(ref(db, "products/" + id), {
    ...product,
    id,
    imageUrl,
    price: Number(product.price),
    options: product.options.split(","),
  });
}

export async function downloadProduct() {
  try {
    const snapshot = await get(ref(db, `products/`));
    if (snapshot.exists()) {
      const products = snapshot.val();

      return products;
    }
  } catch (error) {
    console.error(error);
  }
}
