import React, {useState} from 'react'

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';

function NewIncident() {
    const [titulo, setTitulo] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')

    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleIncident(e){

        e.preventDefault();

        const data = {titulo, description, value}
        
        try{
            const response = await api.post('incidents', 
            data, {
            headers:{
                Authorization: ongId
            }
        })

       if (response.data.id !== 0) {
            history.push('/profile')
       }     

        }catch(err) {
            alert('Não foi possivel cadastrar um novo incidente')
        }
        

    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/> 

                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                <Link className="back-link" to="/profile">
                   <FiArrowLeft size={16} color="#E02041" />
                   Volta para Home
                 </Link>
            </section>
            <form onSubmit={handleIncident}>
                 <input placeholder="Titulo do Caso" 
                 value={titulo} onChange={ e => setTitulo(e.target.value)}/>
                 <textarea placeholder="Descrição"
                 value={description}
                 onChange={e => setDescription(e.target.value)}
                 ></textarea>

                 <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)} />
            
                 <button className="button" type="submit">Cadastrar</button>


            </form>
        </div>
    </div>
    )
}

export default NewIncident;