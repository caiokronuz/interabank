import Image from 'next/image'
import {redirect} from 'next/navigation'
import styles from './page.module.scss'
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

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

export default function Home() {

  const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY || ""
  const cookieStore = cookies();
  var login = ""

  try{
    let {value} = cookieStore.get("sessionId") as CookieProps
    let getLogin = jwt.verify(value, SECRET_KEY);
    login = getLogin.toString();
    console.log(`login: ${login}`)
  }catch(err){
    redirect('/login')
  }

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
