import { useState } from 'react';
import style from './DepositOnAccount.module.scss';

interface Props{
    close: () => void;
    reais: number;
}

export function DepositOnAccount(props: Props){

    const [valor, setValor] = useState(0);

    return(
        <div className={style.container}>
            <div className={style.modal}>
                <header className={style.header}>
                    <p onClick={props.close}>x</p>
                </header>
                <main className={style.main}>
                   <h1>Escolha quanto você quer sacar</h1>
                   <input type="number" placeholder={`Valor máximo: R$${props.reais.toFixed(2)}`}/>
                   <button onClick={() => {}}>Sacar</button>
                </main>
            </div>
        </div>
    )
}