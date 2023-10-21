import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../style/fav.css"
const FavRecipe = () => {
    const [data, setData] = useState([])
// const [update, setUpadate] = useState(false)

    const handleDelete = (id) => {
        axios.delete(`https://thoughtful-fawn-slippers.cyclic.app/recipe/delete/${id}`, {
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
        axios.get("https://thoughtful-fawn-slippers.cyclic.app/recipe", {
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
{
    data.length>0 ?  <div className='main'>
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
    </div>:<div className='empty'>
    <img src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png" alt="" />
</div>
}


       
        </>
 
  )
}

export default FavRecipe
