"use client"
import {useEffect, useState} from 'react';
import Link from 'next/link';
import { MdCurrencyExchange, MdReadMore } from "react-icons/md";

import {useDispatch, useSelector} from 'react-redux'
import { setUser } from '@/src/store/userSlice';
import {RootState} from '../../store/store'

import styles from './balanceCard.module.scss';
import { UserProps } from '@/src/utils/props';

interface BalanceCardProps{
    user: UserProps;
}

export function BalanceCard({user}: BalanceCardProps){

    const dispatch = useDispatch();

    const [changeBalance, setChangeBalance] = useState(true);

    const isBalanceVisible = useSelector((state: RootState) => state.boolean.value)

    useEffect(() => {
        dispatch(setUser(user));
    },[user, dispatch])


    return(
        <div className={styles.main}>
            <header className={styles.header}>
                {changeBalance ? <strong>Saldo em Intera</strong> : <strong>Saldo em Euro</strong>}
                <MdCurrencyExchange size={24} color="#2ec3ac" onClick={() => setChangeBalance(!changeBalance)}/>
            </header>
            <section className={styles.balance}>
                {changeBalance ? 
                    isBalanceVisible ? <p>I$ {user.interas}</p> : <p>I$ -</p> 
                    : 
                    isBalanceVisible ? <p>EUR {user.interas * 5}</p> : <p>EUR -</p>
                }
                <Link href="/transactions">
                    <MdReadMore size={24} color="#2ec3ac" />
                </Link>
            </section>
        </div>
    )
}