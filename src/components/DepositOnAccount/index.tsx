import style from './DepositOnAccount.module.scss';

interface Props{
    close: () => void;
}


export function DepositOnAccount(props: Props){
    return(
        <div className={style.container}>
            <div className={style.modal}>
                <header className={style.header}>
                    <p onClick={props.close}>x</p>
                </header>
                <main className={style.main}>
                   <h1>Escolha quanto você quer sacar</h1>
                </main>
            </div>
        </div>
    )
}