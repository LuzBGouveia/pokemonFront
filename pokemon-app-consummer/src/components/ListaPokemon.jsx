import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { FaEdit, FaTrash } from "react-icons/fa"

const DivLista = styled.div`
    width: 70%; margin: auto; font-family: Arial;
    a{text-decoration: none; padding: 10px 15px; margin-bottom: 20px;
        background-color: yellowgreen; color: white; display: inline-block;
    }
    table{width: 100%; margin: auto;}
    thead tr{background-color: darkblue; color: white;}
    thead tr th{padding: 10px;}
    tbody tr:nth-child(2n+2){background-color: #ccc;}
    tbody tr td a{background-color: none; margin-bottom: 5px; color: blue;}
    tbody tr td button{color: red; background-color: none; border: none; cursor: pointer; padding: 13px 17px;}
    tfoot tr td{text-align: center; background-color: #333; color: white;}
`

export default function ListaPokemon(){

    const [pokemons, setPokemons] = useState([])
    useEffect(()=>{
        fetch("https://pokemon-rm566422.onrender.com/pokemon").then((resp)=>{
            return resp.json();
        }).then((resp)=>{
            setPokemons(resp)
            console.log(resp)
        }).catch((error)=>{
            console.log(error)
        })
    }, [])

    const handleDelete = (codigo)=>{
        fetch(`https://pokemon-rm566422.onrender.com/pokemon/${codigo}`,{
            method:"delete"
        }).then(()=>{
            window.location = "/"
        }).catch((error)=>{
            console.log(error)
        })
    }

    return(
        <DivLista>
            <h1>Lista de pokemon</h1>
            <Link to="incluir">Inserir Pokemon</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th><th>Altura</th><th>Peso</th><th>Tipo</th><th>DataDaCaptura</th><th></th>
                    </tr>
                </thead>
                <tbody>
                    {pokemons.map((pokemon)=>(
                        <tr key={pokemon.codigo}>
                            <td>Nome: {pokemon.nome}</td>
                            <td>{pokemon.altura}m</td>
                            <td>{pokemon.peso}kg</td>
                            <td>Tipo: {pokemon.categoria}</td>
                            <td>{pokemon.dataDaCaptura}</td>
                            <td>
                                <Link to={`/editar/${pokemon.codigo}`}><FaEdit /></Link>&nbsp;
                                <button onClick={handleDelete.bind(this, pokemon.codigo)}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot><tr><td colSpan="6">Pokemon do Banco de Dados</td></tr></tfoot>
            </table>
        </DivLista>
    )

}