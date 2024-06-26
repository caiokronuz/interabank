"use client"
import { Header } from "@/components/Header";
import { RiSendPlaneFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from './pix.module.scss';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { useEffect, useState } from "react";
import { UserProps } from "@/utils/props";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setReceiver } from "@/store/receiverSlice";


interface usersProps extends Array<UserProps> { }

export default function Pix() {
    const router = useRouter();

    const dispatch = useDispatch()
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

    async function getReceiver(index:number){
        await dispatch(setReceiver(users[index]));
    }  

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
                    {users.map((user, index) => (
                        user.name != userName ? (
                            <span key={user.id}>
                                {user.name}
                                <Link href={`/pix/${user.id}`} onClick={() => getReceiver(index)}><RiSendPlaneFill color="#2ec3ac" size={20} /></Link>
                            </span>
                        ) : ('')
                    ))}
                </div>
            </section>
        </main>
    )
}