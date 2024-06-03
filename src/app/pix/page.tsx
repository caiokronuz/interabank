"use client"
import { Header } from "@/src/components/Header";
import { RiSendPlaneFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from './pix.module.scss';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/src/services/firebaseConnection";
import { useEffect, useState } from "react";
import { UserProps } from "@/src/utils/props";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";


interface usersProps extends Array<UserProps> { }

export default function Pix() {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user)
    const isBalanceVisible = useSelector((state: RootState) => state.boolean.value);

    const [users, setUsers] = useState<usersProps>([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {

        async function getUsers(){
            if(user.name == ''){
                router.push('/')
                return;
            }else{
                const usersRef = collection(db, "users")
                const usersSnapshot = await getDocs(usersRef)
    
                const usersList: UserProps[] = usersSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as UserProps));
    
                setUsers(usersList);
                setUserName(user.name);
            }
        }

        getUsers();
    }, [])

    return (
        <main className={styles.main}>
            <Header />
            <section className={styles.section}>
                <p className={styles.balance}>Seu saldo <strong>I${isBalanceVisible ? user.interas : "-"}</strong></p>
                <div className={styles.search}>
                    <input type="text" name="name" id="name" placeholder="Nome do contato" />
                </div>
                <p>Seus contatos</p>
                <div className={styles.cards}>
                    {users.length === 0 && <p>carregando...</p>}
                    {users.map(user => (
                        user.name != userName ? (
                            <span>
                                {user.name}
                                <Link href={`/pix/${user.id}`}><RiSendPlaneFill color="#2ec3ac" size={20} /></Link>
                            </span>
                        ) : ('')
                    ))}
                </div>
            </section>
        </main>
    )
}