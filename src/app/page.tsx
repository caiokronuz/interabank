'use client';
import Image from 'next/image'
import {useState} from 'react'
import styles from './page.module.scss'

import { BillsToPay } from '../components/BillsToPay';
import { DepositOnAccount } from '../components/DepositOnAccount';
import { Invest } from '../components/Invest';

import logo from '../../public/logo.png';

export default function Home() {

  const [interas,setInteras] = useState(20000)
  const [reais, setReais] = useState(interas * 1.42)
  const [isBillModalsOpen, setIsBillModalsOpen] = useState(false)
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false)

  const [billsToPay, setBillsToPay] = useState(1);

  function attInteras(value: any){
    setInteras(interas - value)
    setReais((interas - value) * 1.42)
  }

  return (
    <main className={styles.main}>

      <header className={styles.header}>
        <Image src={logo} alt="Logo Interconnect"/>
      </header>

      {isBillModalsOpen && <BillsToPay close={() => setIsBillModalsOpen(!isBillModalsOpen)} attInteras={(value: any) => attInteras(value)} setBillsToPay={(value: any) => setBillsToPay(value)}/>}
      {isDepositModalOpen && <DepositOnAccount close={() => setIsDepositModalOpen(!isDepositModalOpen)} reais={reais} attInteras={(value: any) => attInteras(value)}/>}
      {isInvestModalOpen && <Invest close={() => setIsInvestModalOpen(!isInvestModalOpen)} attInteras={(value:any) => attInteras(value)} reais={reais}/>}


      <div className={styles.page}>
        <div className={styles.mid}>
          <h1 className={styles.greetings}>Olá, Santa Edwiges.</h1>
          <div className={styles.panels}>
            <div className={styles.generation}>
              <h1>Geração 08/2023</h1>
              <p>40.000,00 kWh</p>
            </div>
            <div className={styles.painel}>
              <p>I$ {interas.toFixed(2)}</p>
              <span>= R$ {reais.toFixed(2)}</span>
            </div>
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
