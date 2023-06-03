import React, {useState} from 'react'
import styles from './instruction.module.scss'

export const RecoveryInstruction = () => {
    return(
        <section className={styles.instruction}>
            <p>If you have forgotten your account password, we will help you regain access to it.</p>
            <h3>Follow instructions:</h3>
            <ol>
                <li>Enter the email you used to register your account and submit the form.</li>
                <li>Open your mail and check your incoming messages. There should be an email with login information.</li>
                <li>Log in to your account and be sure to delete the letter, or even better, change the password to a new one.</li>
            </ol>
            <p>Good luck!</p>
        </section>
    );
} 