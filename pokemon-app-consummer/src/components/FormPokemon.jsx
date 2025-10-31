import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import { FaLocationArrow, FaRegTimesCircle } from "react-icons/fa"

const DivForm = styled.div`
    width: 70%; margin: auto; font-family: Arial, Helvetica, sans-serif;
    h1{text-align: center;}
    form{width: 80%; margin: auto;}
    form input{width: 100%; padding: 5px; margin-bottom: 5px;}
    a{background-color: red; margin-botton: 5px; color: white; text-decoration: none; padding: 5px;}
    button{color: white; background-color: green; border: none; display: inline-block; padding: 6px; margin-right: 10px;}
`

export default function FormPokemon(){
    
    let {codigo} = useParams()

    const [novo, setNovo] = useState({
        codigo:codigo,
        nome:"",
        altura:"",
        peso:"",
        categoria:"",
        dataDaCaptura:""
    })

    let metodo = "post"

    if(codigo){
        metodo = "put"
    }

    const handleChange = e =>{
        setNovo({...novo, [e.target.name]:e.target.value})
    }

    const handleSubmit = e =>{
        e.preventDefault()

        fetch(`https://pokemon-rm566422.onrender.com/pokemon/${codigo ? codigo : ""}`, {
            method: metodo,
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(novo)
        }).then(()=>{
            window.location = "/"
        })
    }

    useEffect(()=>{
        if(codigo){
            fetch(`https://pokemon-rm566422.onrender.com/pokemon/${codigo}`)
            .then((resp)=>{
                return(resp.json())
            }).then(data=>{
                setNovo(data)
            })
        }
    }, [codigo])

    return(
        <DivForm>
             <h1>Formulário de Pokemon</h1>            
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome do pokemon: </label><input type="text" name="nome" value={novo.nome} placeholder="Nome do pokemon" onChange={handleChange} /><br />
                <label htmlFor="altura">Altura: </label><input type="number" name="altura" value={novo.altura} placeholder="Altura" onChange={handleChange} step="0.01" /><br />
                <label htmlFor="peso">Peso: </label><input type="number" name="peso" value={novo.peso} placeholder="Peso" onChange={handleChange} step="0.01" /><br />
                <label htmlFor="categoria">Tipo: </label><input type="text" name="categoria" value={novo.categoria} placeholder="Tipo" onChange={handleChange} /><br />
                <label htmlFor="dataDaCaptura">Data da captura: </label><input type="date" name="dataDaCaptura" value={novo.dataDaCaptura} onChange={handleChange} /><br />
                <button><FaLocationArrow /></button>
                <Link to="/"><FaRegTimesCircle /></Link>
            </form>
        </DivForm>
    )

}