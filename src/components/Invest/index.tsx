import style from './Invest.module.scss';

interface Props{
    close: () => void;
}


export function Invest(props: Props){
    return(
        <div className={style.container}>
            <div className={style.modal}>
                <header className={style.header}>
                    <p onClick={props.close}>x</p>
                </header>
                <main className={style.main}>
                   <h1>Investimento</h1>
                </main>
            </div>
        </div>
    )
}