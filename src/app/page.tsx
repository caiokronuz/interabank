import Image from 'next/image'
import styles from './page.module.scss'

import { FaCreditCard } from "react-icons/fa6";
import { FaPix } from "react-icons/fa6";
import { IoTrendingUpOutline } from "react-icons/io5";

import { BalanceCard } from '../components/BalanceCard';

import logo from '../../public/logo.png';

export default function Home() {

  return (
    <main className={styles.main}>
      <BalanceCard />
    </main>
  )
}
