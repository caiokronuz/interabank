"use client"
import {useState} from 'react';
import Link from 'next/link';
import { MdCurrencyExchange, MdReadMore } from "react-icons/md";

import {useSelector} from 'react-redux'
import {RootState} from '../../store/store'

import styles from './balanceCard.module.scss';

export function BalanceCard(){

    const [changeBalance, setChangeBalance] = useState(false);

    const isBalanceVisible = useSelector((state: RootState) => state.boolean.value)


    return(
        <div className={styles.main}>
            <header className={styles.header}>
                {changeBalance ? <strong>Saldo em Intera</strong> : <strong>Saldo em Euro</strong>}
                <MdCurrencyExchange size={24} color="#2ec3ac" onClick={() => setChangeBalance(!changeBalance)}/>
            </header>
            <section className={styles.balance}>
                {changeBalance ? 
                    isBalanceVisible ? <p>I$ 41,00</p> : <p>I$ -</p> 
                    : 
                    isBalanceVisible ? <p>EUR 205,00</p> : <p>EUR -</p>
                }
                <Link href="/balance">
                    <MdReadMore size={24} color="#2ec3ac" />
                </Link>
            </section>
        </div>
    )
}