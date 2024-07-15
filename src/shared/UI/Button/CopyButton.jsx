import React, { useState } from 'react'
import copy from 'clipboard-copy'
import styles from './CopyButton.module.css'

const CopyButton = ({ text }) => {
  const [buttonText, setButtonText] = useState('Copy')

  const handleCopy = () => {
    copy(text).then(() => {
      setButtonText('Copied')
      setTimeout(() => {
        setButtonText('Copy')
      }, 2000)
    })
  }

  return (
    <button className={styles.btn} onClick={handleCopy}>
      {buttonText}
    </button>
  )
}

export default CopyButton
