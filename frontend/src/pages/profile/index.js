import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2  } from 'react-icons/fi';

import api from '../../services/api';


import './style.css';


import logoImg from '../../assets/logo.svg';

function Profile() {

    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('/profile', {
            headers:{
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);

    function numberFormat(value) {
        return Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(value)
    }

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (error) {
            alert('Erro ao deletar o incident')
        }
    }

    function handleLogout() {
         localStorage.clear()
         history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>

            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
               {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.titulo}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{numberFormat(incident.value)}</p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>

                </li>
               ))} 
            </ul>


        </div>
    )
}

export default Profile;