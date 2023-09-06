import {useState} from 'react';
import style from './Invest.module.scss';
import Swal from 'sweetalert2';

interface Props{
    close: () => void;
    reais: number;
    attInteras: (value: any) => void;
}


export function Invest(props: Props){

    const [qtd1, setQtd1] = useState(0);
    const [valor1, setValor1] = useState(500)
    const [qtd2, setQtd2] = useState(0);
    const [valor2, setValor2] = useState(500)

    function purchase(){
        let valorInv = (valor1 * qtd1) + (valor2 * qtd2);

        if(valorInv == 0){
            Swal.fire('Erro', 'Selecione um valor válido para saque', 'error')
            return;
        }

        if(valorInv > props.reais){
            Swal.fire('Erro', 'O valor inserido é maior que o disponível', 'error')
            return;
        }

        props.attInteras(valorInv/1.42);
        if(qtd1 > 0 && qtd2 == 0){
            Swal.fire('Investimento realizado com sucesso', `Parabéns, você agora é sócio da Apollo I com ${(0.2 * qtd1).toFixed(2)}%`, 'success')
            return;
        }

        if(qtd1 > 0 && qtd2 > 0){
            Swal.fire('Investimento realizado com sucesso', `Parabéns, você agora é sócio da Apollo I com ${(0.2 * qtd1).toFixed(2)}% e da Apollo II com ${(0.2 * qtd2).toFixed(2)}%`, 'success')
            return;
        }

        if(qtd1 == 0 && qtd2 > 0){
            Swal.fire('Investimento realizado com sucesso', `Parabéns, você agora é sócio da Apollo II com ${(0.2 * qtd2).toFixed(2)}%`, 'success')
            return;
        }

    }

    return(
        <div className={style.container}>
            <div className={style.modal}>
                <header className={style.header}>
                    <p onClick={props.close}>x</p>
                </header>
                <main className={style.main}>
                   <h1>Usinas disponíveis para investimento</h1>
                   <div className={style.usina}>
                        <p>Apollo <span className={style.invisible}>II</span></p>
                        <p>Ocara-CE</p>
                        <p><span onClick={() => {qtd1 > 0 ? setQtd1(qtd1-1) : ""}}> - </span>{qtd1}<span onClick={() => {qtd1 < 9 ? setQtd1(qtd1+1) : ""}}> + </span></p>
                        <p>R${valor1*qtd1}</p>
                   </div>
                   <div className={style.usina}>
                        <p>Apollo II</p>
                        <p>Ocara-CE</p>
                        <p><span onClick={() => {qtd2 > 0 ? setQtd2(qtd2-1): ""}}> - </span>{qtd2}<span onClick={() => {qtd2 < 9 ? setQtd2(qtd2+1) : ""}}> + </span></p>
                        <p>R${valor2*qtd2}</p>
                   </div>
                   <div className={style.purchase}>
                        <h1>Total</h1>
                        <p>R${(valor1 * qtd1) + (valor2 * qtd2)}</p>
                        <button onClick={purchase}>Efetuar investimento</button>
                   </div>
                </main>
            </div>
        </div>
    )
}