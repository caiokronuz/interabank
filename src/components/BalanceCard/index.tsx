"use client"
import {useState, useEffect} from 'react';
import Link from 'next/link';
import { MdCurrencyExchange, MdReadMore } from "react-icons/md";

import {useSelector, useDispatch} from 'react-redux'
import {RootState} from '../../store/store'
import {toggle} from '../../store/booleanSlice'


import styles from './balanceCard.module.scss';

export function BalanceCard(){
    const [changeBalance, setChangeBalance] = useState(false);

    const isBalanceVisible = useSelector((state: RootState) => state.boolean.value)

    return(
        <div className={styles.main}>
            <header className={styles.header}>
                {changeBalance ? <strong>Saldo em Interas</strong> : <strong>Saldo em Euros</strong>}
                <MdCurrencyExchange size={24} color="#2ec3ac" onClick={() => setChangeBalance(!changeBalance)}/>
            </header>
            <section className={styles.balance}>
                {changeBalance ? 
                    isBalanceVisible ? <p>I$ 39,00</p> : <p>I$ -</p> 
                    : 
                    isBalanceVisible ? <p>EUR 195,00</p> : <p>EUR -</p>
                }
                <Link href="/balance">
                    <MdReadMore size={24} color="#2ec3ac" />
                </Link>
            </section>
        </div>
    )
}