import Image from 'next/image'
import styles from './page.module.scss'

import { FaCreditCard } from "react-icons/fa6";
import { FaPix } from "react-icons/fa6";

import { BalanceCard } from '../components/BalanceCard';

import logo from '../../public/logo.png';
import Link from 'next/link';

export default function Home() {

  return (
    <main className={styles.main}>
      <BalanceCard />
      <div className={styles.buttons}>
        <Link href="/pix"><FaPix size={20} color='#393939'/>Transferência</Link>
        <Link href="/card"><FaCreditCard size={20} color='#393939'/>Pagamento</Link>
      </div>
    </main>
  )
}
