import React, {useEffect, useState} from 'react'
import styles from "./textarea.module.scss"

export const TextArea = ({placeholder, value, onChange, isError}) => {
    return(
        <textarea placeholder={placeholder} 
                  value={value}
                  className={isError  ? styles.error : undefined}
                  onChange={e => onChange(e)}/>
    );
}