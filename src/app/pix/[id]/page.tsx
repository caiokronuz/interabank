"use client"
import { db } from "@/src/services/firebaseConnection";
import { RootState } from "@/src/store/store"
import { UserProps } from "@/src/utils/props";
import { update } from "firebase/database";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function Pix() {

    const owner: UserProps = useSelector((state: RootState) => state.user);
    const receiver: UserProps = useSelector((state: RootState) => state.receiver);

    const [pix, setPix] = useState({
        owner: owner?.name,
        receiver: receiver?.name,
        value: 0,
        message: "",
    })

    async function sendPix(event: FormEvent){
        event.preventDefault();
        
        if(pix.value === 0){
            alert("Você precisa inserir um valor")
            return;
        }

        if(pix.value > owner.interas){
            alert("Você não pode enviar mais do que você tem")
            return;
        }

        if(pix.value < 0){
            alert("Você não pode enviar um valor negativo")
            return;
        }

        //alert(`id do owner: ${owner.id} | id do receiver: ${receiver.id}`)

        try{
            const ownerDocRef = doc(db, 'users', owner.id);
            await updateDoc(ownerDocRef, {
                interas: owner.interas - pix.value,
            });

            const receiverDocRef = doc(db, 'users', receiver.id);
            await updateDoc(receiverDocRef, {
                interas: receiver.interas + pix.value,
            });

            alert("pix realizado com sucesso")
        }catch(err){
            alert("erro")
            console.log(err)
        }

        

    }

    return (
        <main>
            <div>
                <p>Seu saldo: <strong>I${owner.interas}</strong></p>
            </div>
            <section>
                <div>
                    <h2>Quem vai receber o pix</h2>
                    <p>{receiver.name}</p>
                </div>

                <form onSubmit={sendPix}>
                    <div>
                        <h2>Valor</h2>
                        <div>
                            <strong>I$</strong>
                            <input type="number" name="value" id="value" onChange={e => setPix({...pix, value: Number(e.target.value)})}/>
                        </div>
                    </div>

                    <div>
                        <h2>Mensagem</h2>
                        <textarea name="" id="" onChange={e => setPix({...pix, message: e.target.value})}></textarea>
                    </div>

                    <button type="submit">Enviar</button>
                </form>
            </section>
        </main>
    )
}