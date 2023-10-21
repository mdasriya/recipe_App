import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../style/fav.css"
const FavRecipe = () => {
    const [data, setData] = useState([])
// const [update, setUpadate] = useState(false)

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/recipe/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
        )
          .then(res => {
            alert(res.data.msg)
          })
          getData()
      }
      const getData = () => {
        axios.get("http://localhost:8080/recipe", {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          })
            .then((res) => {
              setData(res.data)
            })
      }

    useEffect(() => {
     getData()
      }, [handleDelete])
  return (
<>
<h2>Your Favorites recipe</h2>

        <div className='main'>
        {
            data.map((recipe)=> <div className='container' key={recipe._id}>
   <img src={recipe.image} alt="" />
   <h3>{ recipe.title}</h3>
                <p>{ recipe.summary.slice(0, 100)}...</p>
                <p>{recipe.instructions.slice(0, 100)}...</p>
                <button className='delete_btn' onClick={()=>handleDelete(recipe._id)}>Delete</button>
            </div>
            )
        }
        </div>
        </>
 
  )
}

export default FavRecipe
