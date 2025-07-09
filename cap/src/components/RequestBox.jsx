 import { useState } from "react";
import axios from "axios";
import DogImage from "./DogImage";
import "./RequestBox.css";


const DOG_API_KEY = "live_CQuXcCQyWgE9thIz66v3beOfQgcDRka9vxnurjMi7SySFKcrEa4keP1IOGHBuFn6"

export default function RequestBox() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [breedInfo, setBreedInfo] = useState(null);


  async function fetchDogImage() {
    // console.log('Pressing button.')
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("https://api.thedogapi.com/v1/images/search", {
        headers: {
          "x-api-key": DOG_API_KEY,
        },
        params: { limit: 1, size: "med", include_breeds: true, },
      });

      const data = response.data[0];

    if (data && data.breeds && data.breeds.length > 0) {
      const breed = data.breeds[0];

      setImageUrl(data.url);
      setBreedInfo({
        breed: breed.name || "Unknown",
        origin: breed.origin || "Unknown",
        weight: breed.weight?.metric || "Unknown",
        lifespan: breed.life_span || "Unknown",
      });

      console.log("🐾 Breed:", breed.name || "Unknown");
      console.log("🌍 Origin:", breed.origin || "Unknown");
      console.log("⚖️ Weight (kg):", breed.weight?.metric || "Unknown");
      console.log("📅 Lifespan:", breed.life_span || "Unknown");

    } else {
      // No breed info: clear previous image and info, show error or ignore silently
      setImageUrl(data.url);
      setBreedInfo(null);
      setError("Unfortunately, no breed information was found for this dog.");
      // Optionally, you could automatically retry here or just let user press button again
    }
  } catch (err) {
    setError(err.message || "Failed to fetch image");
    setImageUrl(null);
    setBreedInfo(null);
  } finally {
    setLoading(false);
  }
}




  return (
    <div>
      <button className="button-discover" onClick={fetchDogImage}>
        {loading ? "Loading..." : "🔄 Discover!"}
        </button>
    



      {error && <p style={{ color: "red" }}>{error}</p>}

      <DogImage imageUrl={imageUrl} />
      {breedInfo && (
        <div className="info-buttons-container">
            <button className="info-button">Breed: {breedInfo.breed}</button>
            <button className="info-button">Origin: {breedInfo.origin}</button>
            <button className="info-button">Weight: {breedInfo.weight} kg</button>
            <button className="info-button">Lifespan: {breedInfo.lifespan}</button>
        </div>
    )}
    </div>
  );
}

