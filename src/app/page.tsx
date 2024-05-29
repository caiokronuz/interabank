import Image from 'next/image'
import {redirect} from 'next/navigation'
import styles from './page.module.scss'
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { UserProps } from '../utils/props';

import { db } from '../services/firebaseConnection';
import { doc, collection, query, where, getDoc, getDocs, addDoc, deleteDoc, Timestamp } from 'firebase/firestore'

import { Header } from '../components/Header'

import { FaCreditCard } from "react-icons/fa6";
import { FaPix } from "react-icons/fa6";

import { BalanceCard } from '../components/BalanceCard';

import logo from '../../public/logo.png';
import Link from 'next/link';

interface CookieProps {
  name: string,
  value: string
}

export default async function Home() {

  const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || ""
  const cookieStore = cookies();
  var login = ""

  var user: UserProps = {
    name: "",
    login: "",
    password: "",
    interas: 0,
    created: new Timestamp(0,0),
  }

  try{
    let {value} = cookieStore.get("sessionId") as CookieProps
    let getLogin = jwt.verify(value, SECRET_KEY);
    login = getLogin.toString();
    
    const q = query(collection(db, "users"), where("login", "==", login));
    const snapshotAccount = await getDocs(q);

    const userDoc = snapshotAccount.docs[0];
    const userData = userDoc.data() as UserProps; // Tipando os dados como User

    const miliseconds = userData.created?.seconds * 1000;
  

    user = {
      name: userData.name,
      login: userData.login,
      password: userData.password,
      interas: userData.interas,
      created: new Date(miliseconds).toLocaleDateString(),
    };

  }catch(err){
    redirect('/login')
  }

  console.log(user);

  return (
    <>
      <Header/>
      <main className={styles.main}>
      <BalanceCard />
      <div className={styles.buttons}>
        <Link href="/pix"><FaPix size={20} color='#393939'/>Transferência</Link>
        <Link href="/card"><FaCreditCard size={20} color='#393939'/>Pagamento</Link>
      </div>
    </main>
    </>
  )
}
