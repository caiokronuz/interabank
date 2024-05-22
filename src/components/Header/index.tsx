'use client'
import Image from 'next/image';
import {useState} from 'react';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'
import { MdOutlineAccountCircle } from "react-icons/md";

import logo from '../../../public/logo.png';
import styles from './header.module.scss'

export function Header(){

    const [isBalanceVisible, setIsBalanceVisible] = useState(false);

    function handleBalanceVisibilityChange(){
        setIsBalanceVisible(!isBalanceVisible)
        localStorage.setItem("isBalanceVisible", String(isBalanceVisible))
    }

    return(
        <header className={styles.header}>
            <Image
                src={logo}
                alt="Logo Interconnect"
                quality={100}
                priority
            />
            <div className={styles.buttons}>
                {isBalanceVisible ? 
                    <FaRegEye size={25} color="#FFF" onClick={handleBalanceVisibilityChange}/>
                    : 
                    <FaRegEyeSlash size={26} color="#FFF" onClick={handleBalanceVisibilityChange}/> 
                }
                <MdOutlineAccountCircle size={25} color="#FFF"/>
            </div>
        </header>
    )
}