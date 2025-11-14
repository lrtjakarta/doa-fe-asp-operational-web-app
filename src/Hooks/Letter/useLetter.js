import React, { useState, useContext } from 'react'

import { LetterContext } from '../../Context'
import _ from 'lodash'

export default function useLetter() {
  const { getDataLetter, putDataLetter, letter, filterLetter } =
    useContext(LetterContext)

  const [id, setId] = useState('')
  const [titleHead, setTitleHead] = useState('')
  const [titleDoc, setTitleDoc] = useState('')
  const [type, setType] = useState('')
  const [numberHead, setNumberHead] = useState('')
  const [numberDoc, setNumberDoc] = useState('')
  const [page, setPage] = useState('')
  const [revisionNumber, setRevisionNumber] = useState('')
  const [paddingValue, setPaddingValue] = useState('')

  const handleSubmit = async () => {
    let datasend = {
      titleHead,
      titleDoc,
      type,
      numberHead,
      numberDoc,
      page,
      revisionNumber,
      padding: paddingValue,
      createBy: JSON.stringify(localStorage.profile),
    }
    await putDataLetter(id, datasend)
  }

  return {
    getDataLetter,
    handleSubmit,
    filterLetter,
    letter,
    titleHead,
    titleDoc,
    type,
    numberHead,
    numberDoc,
    page,
    revisionNumber,
    paddingValue,
    id,
    setTitleHead,
    setTitleDoc,
    setType,
    setNumberHead,
    setNumberDoc,
    setPage,
    setRevisionNumber,
    setPaddingValue,
    setId,
  }
}
