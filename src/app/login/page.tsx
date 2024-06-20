import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

import { LoginCard } from '@/components/LoginCard';

import { db } from '@/services/firebaseConnection';
import { addDoc, collection, query, getDocs, where } from 'firebase/firestore';

import styles from './login.module.scss';

export default async function Login() {

    const session = await auth();

    if (session?.user) {

        const { name, email, image } = session.user
        const q = query(collection(db, "users"), where("email", "==", email));
        const snapshotAccount = await getDocs(q);

        if (!snapshotAccount.empty) {
            redirect("/")
        } else {
            console.log("nenhum usuário cadastrado")
            await addDoc(collection(db, "users"), {
                name,
                email,
                image,
                interas: 0,
                created: new Date(),
            })
            redirect("/")
        }
    }

    return (
        <main className={styles.main}>
            <LoginCard />
        </main>
    )
}