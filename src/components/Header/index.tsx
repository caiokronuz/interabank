"use client"
import Image from 'next/image';
import Link from 'next/link';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import { MdOutlineAccountCircle } from "react-icons/md";

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { toggle } from '../../store/booleanSlice'

import logo from '../../../public/logo.png';
import styles from './header.module.scss'
import { useEffect } from 'react';

export function Header() {

    const isBalanceVisible = useSelector((state: RootState) => state.boolean.value)
    const dispatch = useDispatch();

    return (
        <header className={styles.header}>
            <Link href={'/'}>
                <Image
                    src={logo}
                    alt="Logo Interconnect"
                    quality={100}
                    priority
                />
            </Link>

            <div className={styles.buttons}>
                {isBalanceVisible ?
                    <FaRegEyeSlash size={26} color="#FFF" onClick={() => dispatch(toggle())} />
                    :
                    <FaRegEye size={25} color="#FFF" onClick={() => dispatch(toggle())} />
                }
                <MdOutlineAccountCircle size={25} color="#FFF" />
            </div>
        </header>
    )
}