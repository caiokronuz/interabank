import Image from 'next/image'
import styles from './page.module.scss'

import logo from '../../public/logo.png';

export default function Home() {

  const interas = 500
  const reais = interas * 2

  return (
    <main className={styles.main}>

      <header className={styles.header}>
        <Image src={logo} alt="Logo Interconnect"/>
      </header>

      <div className={styles.page}>
        <div className={styles.mid}>
          <div className={styles.painel}>
            <p>I$ {interas}</p>
            <span>= R$ {reais}</span>
          </div>
          <div className={styles.buttons}>
            <button>
              <p>Pague sua energia</p>
            </button>
            <button>
              <p>Receba em dinheiro</p>
            </button>
            <button>
              <p>Invista em uma usina</p>
            </button>
          </div>
        </div>
      </div>

    </main>
  )
}
