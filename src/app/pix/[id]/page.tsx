"use client"
import { db } from "@/src/services/firebaseConnection";
import { RootState } from "@/src/store/store"
import { UserProps } from "@/src/utils/props";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FormEvent, useState, useEffect } from "react"
import { useSelector } from "react-redux"

import { useRouter } from "next/navigation";

import { Header } from "@/src/components/Header";

import styles from './pix.module.scss';

export default function Pix() {

    const origin: UserProps = useSelector((state: RootState) => state.user);
    const receiver: UserProps = useSelector((state: RootState) => state.receiver);
    const isBalanceVisible = useSelector((state: RootState) => state.boolean.value)

    const router = useRouter();

    const [pix, setPix] = useState({
        owner: origin?.name,
        receiver: receiver?.name,
        value: 0,
        message: "",
    })

    useEffect(() => {
        if (origin.name == '') {
            router.push('/')
            return;
        }
    }, [])

    async function sendPix(event: FormEvent) {
        event.preventDefault();

        if (pix.value === 0) {
            alert("Você precisa inserir um valor")
            return;
        }

        if (pix.value > origin.interas) {
            alert("Você não pode enviar mais do que você tem")
            return;
        }

        if (pix.value < 0) {
            alert("Você não pode enviar um valor negativo")
            return;
        }

        //alert(`id do owner: ${owner.id} | id do receiver: ${receiver.id}`)

        try {
            const ownerDocRef = doc(db, 'users', origin.id);
            await updateDoc(ownerDocRef, {
                interas: origin.interas - pix.value,
            });

            const receiverDocRef = doc(db, 'users', receiver.id);
            await updateDoc(receiverDocRef, {
                interas: receiver.interas + pix.value,
            });

            const transaction = {
                created: new Date(),
                value: pix.value,
                origin_id: origin.id,
                receiver_id: receiver.id,
                message: pix.message,
            }

            await addDoc(collection(db, 'transactions'), transaction)

            alert(`COMPROVANTE PIX: \n QUEM ENVIOU: ${origin.name} \n QUEM RECEBEU: ${receiver.name} \n VALOR: I$ ${pix.value} \n MESSAGEM: ${pix.message} \n DATA DO ENVIO ${transaction.created.toLocaleDateString()}`)

            router.push("/")
        } catch (err) {
            alert("erro")
            console.log(err)
        }



    }

    return (
        <main className={styles.main}>
            <Header />
            <section className={styles.content}>
                <div className={styles.balance}>
                    <p>Seu saldo: <strong>I$ {isBalanceVisible ? origin.interas : '--'}</strong></p>
                </div>
                <div className={styles.pix}>
                    <div className={styles.receiver}>
                        <h2>Quem vai receber</h2>
                        <p>{receiver.name}</p>
                    </div>

                    <form onSubmit={sendPix}>
                        <div className={styles.value}>
                            <h2>Valor</h2>
                            <div>
                                <strong>I$</strong>
                                <input type="number" name="value" id="value" onChange={e => setPix({ ...pix, value: Number(e.target.value) })} />
                            </div>
                        </div>

                        <div className={styles.message}>
                            <h2>Mensagem</h2>
                            <textarea name="" id="" onChange={e => setPix({ ...pix, message: e.target.value })} placeholder="Digite uma mensagem"></textarea>
                        </div>

                        <button type="submit">Enviar</button>
                    </form>
                </div>
            </section>
        </main>
    )
}