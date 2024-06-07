"use client"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/store';
import { db } from '@/src/services/firebaseConnection';
import { Timestamp, collection, getDocs, query, where } from 'firebase/firestore';

import { Header } from '@/src/components/Header';

import styles from './styles.module.scss';

interface Transaction {
    id: string;
    created: Timestamp;
    message: string;
    origin_id: string;
    origin_name: string;
    receiver_id: string;
    receiver_name: string;
    value: number;
}

export default function Transactions() {

    const owner = useSelector((state: RootState) => state.user);
    const isBalanceVisible = useSelector((state: RootState) => state.boolean.value);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        if (owner.login === "") return;

        async function getTransactions() {
            console.log(owner)
            const transactionsRef = collection(db, "transactions");
            const q1 = query(transactionsRef, where("origin_id", "==", owner.id));
            const q2 = query(transactionsRef, where("receiver_id", "==", owner.id));

            const [querySnapshot1, querySnapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

            const fetchedTransactions: Transaction[] = [
                ...querySnapshot1.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data() as Omit<Transaction, 'id'> // Spread sem 'id'
                })),
                ...querySnapshot2.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data() as Omit<Transaction, 'id'> // Spread sem 'id'
                }))
            ];

            fetchedTransactions.sort((a, b) => b.created.seconds - a.created.seconds);
            setTransactions(fetchedTransactions);
        }

        getTransactions();

    }, [])

    return (
        <main className={styles.main}>
            <Header />
            <section className={styles.transactionsSection}>
                <ul>
                    {transactions.length > 0 ? (
                        transactions.map(transaction => (
                            <>
                                <p className={styles.date}>{new Date(transaction.created.seconds * 1000).toLocaleString()}</p>
                                <li key={transaction.id}>
                                    <p>{transaction.origin_id === owner.id ? "Pix enviado" : "Pix recebido"}</p>
                                    <p style={transaction.origin_id === owner.id ? { color: "red" } : { color: "green" }}>I$ {isBalanceVisible ? transaction.value : '-'}</p>
                                    <p>{transaction.origin_id === owner.id ? transaction.receiver_name : transaction.origin_name}</p>
                                    <p className={styles.message}>{transaction.message}</p>
                                </li>
                            </>
                        ))
                    ) : (
                        <p>Nenhuma transação</p>
                    )}
                </ul>
            </section>
        </main>
    )
}