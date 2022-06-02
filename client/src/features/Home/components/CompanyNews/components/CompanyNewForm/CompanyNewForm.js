import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

import { Button, IconButton, TextField, TextareaAutosize } from '@mui/material';

export default function CompanyNewForm({ type, initialTitle, initialtext, closeModal, setAllCompanyNews }) {

    const [title, setTitle] = useState(initialTitle)
    const [text, setText] = useState(initialtext)

    const submit = async (e) => {
        e.preventDefault()
        if (type === 'modify') {

        } else {
            const newCompanyNew = await axios.post('api/new', { title, text })
            setAllCompanyNews(prev => [newCompanyNew.data, ...prev])
        }

    }

    return (

        <div className='company-new-form'>
            <div className='company-new-form-top'>
                <h2>Ajouter une nouvelle</h2>
                <div className='company-new-form-top__button-container'>
                    <IconButton
                        color="error"
                        aria-label="Retour"
                        onClick={closeModal}
                    >
                        <CloseIcon color='error' fontSize='medium' />
                    </IconButton>
                </div>
            </div>
            <form>
                <TextField
                    className='company-new-form__input'
                    id="company-new-form-title-input"
                    name='title'
                    label="Titre"
                    value={title}
                    variant="outlined"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className='company-new-form-textarea'>
                    <label className='company-new-form-textarea__label' htmlFor='company-new-form-textarea'>Biographie</label>
                    <TextareaAutosize
                        id='company-new-form-textarea'
                        maxLength={500}
                        minRows={3}
                        maxRows={5}
                        className='company-new-form-textarea__input'
                        name='text'
                        value={text}
                        onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={'Nouvelle de l\'entreprise...'}
                    />
                </div>
                <div className='company-new-form-bottom'>

                    <Button
                        variant='contained'
                        type='submit'
                        onClick={submit}
                        disabled={title === '' || text === '' || (title === initialTitle && text === initialtext)}
                    >
                        {type === 'modify' ? 'Modifier' : 'Ajouter'}
                    </Button>

                </div>
            </form>
        </div>

    )
}