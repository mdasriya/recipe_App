import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

export const Details = () => {
    let { id } = useParams();
    console.log(id)
 
    const apiKey = '669aaaeebc2c443dad9cb08436de8d23';
    const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`;
    const [data, setData] = useState([])
    useEffect(() => {
        fetch(apiUrl).then((e) => {
            return e.json()
        }).then((r) => {
            setData(r)
        })

    }, [])


    console.log(data)
    return (
        <>
            <div key={data && data.id}>
                <img src={data && data.image} alt="Recipe Image" />
                <h3>{data && data.title}</h3>
                <p>{data && data.summary}</p>
                <p>{data && data.instructions}</p>
            </div>

        </>
    )
}
