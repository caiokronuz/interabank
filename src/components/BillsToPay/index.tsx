import swal from 'sweetalert2';
import { useState } from 'react';
import style from './BillsToPay.module.scss';

interface Props{
    close: () => void;
    attInteras: (value: any) => void;
    setBillsToPay: (value: any) => void;
}

export function BillsToPay(props: Props){
    const [text, setText] = useState("Pagar")

    function showMsg(){
        swal.fire("Confirmado","Pagamento da sua conta de energia efetuado com sucesso.", "success")
        setText("Pago")
        props.attInteras(23400/1.42)
        props.setBillsToPay(0);
    }

    function payBill(){
        setText("...")
        setTimeout(showMsg, 2000);
    }

    return(
        <div className={style.container}>
            <div className={style.modal}>
                <header className={style.header}>
                    <p onClick={props.close}>x</p>
                </header>
                <main className={style.main}>
                    <h1>FATURAS EM ABERTO:</h1>
                    <div className={style.bill}>
                        <p><span>Referência:</span> 08/2023</p>
                        <p><span>Vencimento:</span> 10/09/2023</p>
                        <p><span>Valor:</span> R$23.400,00</p>
                        <button onClick={payBill}>{text}</button>
                    </div>
                </main>
            </div>
        </div>
    )
}