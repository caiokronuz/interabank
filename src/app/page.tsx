'use client';
import Image from 'next/image'
import {useState} from 'react'
import styles from './page.module.scss'

import { BillsToPay } from '../components/BillsToPay';
import { DepositOnAccount } from '../components/DepositOnAccount';
import { Invest } from '../components/Invest';

import logo from '../../public/logo.png';

export default function Home() {

  const [interas,setInteras] = useState(500)
  const [reais, setReais] = useState(interas * 2)
  const [isBillModalsOpen, setIsBillModalsOpen] = useState(false)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false)

  const [billsToPay, setBillsToPay] = useState(1);

  function attInteras(value: any){
    setInteras(interas - value)
    setReais((interas - value) * 2)
  }

  return (
    <main className={styles.main}>

      <header className={styles.header}>
        <Image src={logo} alt="Logo Interconnect"/>
      </header>

      {isBillModalsOpen && <BillsToPay close={() => setIsBillModalsOpen(!isBillModalsOpen)} attInteras={(value: any) => attInteras(value)} setBillsToPay={(value: any) => setBillsToPay(value)}/>}
      {isDepositModalOpen && <DepositOnAccount close={() => setIsDepositModalOpen(!isDepositModalOpen)} reais={reais}/>}
      {isInvestModalOpen && <Invest close={() => setIsInvestModalOpen(!isInvestModalOpen)}/>}


      <div className={styles.page}>
        <div className={styles.mid}>
          <div className={styles.painel}>
            <p>I$ {interas.toFixed(2)}</p>
            <span>= R$ {reais.toFixed(2)}</span>
          </div>
          <div className={styles.buttons}>
            <button onClick={() => {setIsBillModalsOpen(!isBillModalsOpen)}} disabled={billsToPay == 0 ? true : false}>
              <p>{billsToPay == 0 ? "Nenhuma fatura em aberto" : "Pague sua energia"}</p>
            </button>
            <button onClick={() => {setIsDepositModalOpen(!isDepositModalOpen)}}>
              <p>Receba em dinheiro</p>
            </button>
            <button onClick={() => {setIsInvestModalOpen(!isInvestModalOpen)}}>
              <p>Invista em uma usina</p>
            </button>
          </div>
        </div>
      </div>

    </main>
  )
}
