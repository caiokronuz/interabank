import {auth} from '@/lib/auth';

import Link from 'next/link';
import {redirect} from 'next/navigation'

import { db } from '@/services/firebaseConnection';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore'

import { PiContactlessPayment } from "react-icons/pi";
import { FaPix } from "react-icons/fa6";

import { BalanceCard } from '@/components/BalanceCard';
import { Header } from '@/components/Header'
import { UserDBProps } from '@/utils/props';

import styles from './page.module.scss'

export default async function Home() {

  const session = await auth();
  let user: UserDBProps = {
    id: "",
    name: "",
    email: "",
    image: "",
    interas: 0,
    created: new Timestamp(0,0),
  };

  if(!session || !session.user){
    redirect('/login');
  }else{
    const {name, email, image} = session.user;

    const q = query(collection(db, "users"), where("email", "==", email));
    const snapshotAccount = await getDocs(q);

    const userDoc = snapshotAccount.docs[0];
    const userData = userDoc.data() as UserDBProps;
    user = {
      id: userDoc.id,
      name: userData.name,
      email: userData.email,
      image: userData.image,
      interas: userData.interas,
      created: userData.created,
    }
  }

  return (
    <>
      <Header/>
      <main className={styles.main}>
      <BalanceCard user={user}/>
      <div className={styles.buttons}>
        <Link href="/pix"><FaPix size={20} color='#393939'/>Transferência</Link>
        <button disabled><PiContactlessPayment size={20} color='#393939'/>Pagamento</button>
      </div>
    </main>
    </>
  )
}
