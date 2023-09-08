import { useState } from 'react';
import style from './DepositOnAccount.module.scss';
import Swal from 'sweetalert2';

interface Props{
    close: () => void;
    reais: number;
    attInteras: (value: any) => void;
}

export function DepositOnAccount(props: Props){

    const [valor, setValor] = useState(0);
    const [text, setText] = useState("Sacar")

    const sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }


    async function withdraw(){
        if(valor <= 0){
            Swal.fire('Erro', 'Selecione um valor válido para saque', 'error')
            return;
        }

        if(valor > props.reais){
            Swal.fire('Erro', `Saldo insuficiente para efetuar o saque`, 'error')
            return;
        }

        setText("Iniciando saque...")
        await sleep(2000);
        setText("Enviando para sua conta...")
        await sleep(2000);
        props.attInteras(valor/1.42);
        Swal.fire('Saque efetuado com sucesso!', 'O valor foi depositado na sua conta do banco Itaú', 'success')
        props.close();
        setText("Sacar")

    }

    return(
        <div className={style.container}>
            <div className={style.modal}>
                <header className={style.header}>
                    <p onClick={props.close}>x</p>
                </header>
                <main className={style.main}>
                    <h1>Escolha quanto você quer sacar</h1>
                   <div className={style.content}>
                    <input type="number" placeholder={`Valor máximo: R$${props.reais.toFixed(2)}`} onChange={e => setValor(Number(e.target.value))}/>
                    <div className={style.explanation}>
                        <p>Valor a ser retirado: <span>R${valor.toFixed(2)}</span></p>
                        <p>Taxa de retirada (2%): <span>R${(valor * 0.02).toFixed(2)}</span></p>
                        <p>Valor a ser depositado: <span>R${(valor - (valor * 0.02)).toFixed(2)}</span></p>
                    </div>
                    <button onClick={withdraw}>{text}</button>
                   </div>
                </main>
            </div>
        </div>
    )
}