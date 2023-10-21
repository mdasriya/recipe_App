import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "../style/home.css"
export const Home = () => {
    const apiKey = '669aaaeebc2c443dad9cb08436de8d23';
    const apiUrl = `https://api.spoonacular.com/recipes/random?number=13&tags=vegetarian,dessert&apiKey=${apiKey}`;

    const [data, setData] = useState([])
    const [search, setsearch] = useState("")

    const handlecreatedata = ({ image, title, id, summary, instructions }) => {
        let token = localStorage.getItem("token") 
        if(!token){
  alert("Login first")
        }
        const data = {
            image, title, summary, instructions
        }

        axios.post("https://thoughtful-fawn-slippers.cyclic.app/recipe/create", data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                console.log(res.data.msg);
                alert(res.data.msg)
            })
    }

  

    useEffect(() => {
        if (search) {
            fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=3&addRecipeInformation=true&apiKey=669aaaeebc2c443dad9cb08436de8d23`).then((e) => {
                return e.json()
            })
                .then((r) => {
                    setData(r.results)
                    console.log(r.results, "sd")
                })
        } else {

            fetch(apiUrl).then((e) => {
                return e.json()
            }).then((r) => {
                setData(r.recipes)
            })
        }

    }, [search])


    return (
        <>  
            <input type='text' style={{ width: "20%" }} placeholder='Search recipe...' onChange={(e) => setsearch(e.target.value)} />
            <div>
                <h1>Search Results</h1>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center" }}>


                    {data && data?.map((recipe) => (

                        <div className='item' style={{ width: "309px" }} key={recipe?.id}>
                            <Link to={`/${recipe.id}`}>
                                <img width="123px" src={recipe?.image} alt="Recipe Image" />
                            </Link>
                            <h3>{recipe?.title}</h3>
                            <p>{recipe?.summary.slice(1, 134)}</p>
                            <button className='add_fav' onClick={() => handlecreatedata({ image: recipe.image, title: recipe.title, id: recipe.id, summary: recipe.summary, instructions: recipe.instructions })}>Add To Fav</button>


                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
