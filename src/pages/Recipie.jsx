import React, { useEffect, useState, useCallback } from 'react';
import YouTube from 'react-youtube';
import '../styles/Recipie.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Recipie = () => {

  const { id } = useParams();
  const [recipie, setRecipie] = useState(null);

  // ✅ Use useCallback to avoid stale dependency issues
  const fetchRecipie = useCallback(async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setRecipie(response.data.meals[0]);
      console.log(response.data.meals[0]);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipie();
  }, [fetchRecipie]); // ✅ Added fetchRecipie as dependency

  return (
    <div className="Recipie-page">
      {recipie ? (
        <>
          <div className="recipie-img">
            <img src={recipie.strMealThumb} alt="food-item" />
          </div>

          <div className="recipie-data-container">
            <div className="recipie-data">
              <div className="recipie-header">
                <h4>{recipie.strMeal}</h4>
                <div className="recipie-specials">
                  <p>{recipie.strArea && recipie.strArea}</p>
                  <p>{recipie.strCategory && recipie.strCategory}</p>
                </div>
              </div>

              <div className="procedure">
                <h5>Procedure</h5>
                <p>{recipie.strInstructions}</p>
              </div>

              {recipie.strYoutube && (
                <div className="youtube-video-container">
                  <h5>Video Tutorial</h5>
                  <YouTube
                    className="youtube-video"
                    videoId={recipie.strYoutube.split('v=')[1]}
                    opts={{
                      height: '315',
                      width: '560',
                    }}
                  />
                </div>
              )}
            </div>

            <div className="ingredients-container">
              <h3>Ingredients</h3>
              <ul className="ingredients">
                {Object.entries(recipie).map(([key, value]) => {
                  if (key.startsWith('strIngredient') && value) {
                    const ingredientNumber = key.slice('strIngredient'.length);
                    const measure = recipie[`strMeasure${ingredientNumber}`] || '';

                    return (
                      <li key={key} className="ingredient">
                        <h5>{ingredientNumber} - {value}</h5>
                        <p>{measure}</p>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Recipie;
