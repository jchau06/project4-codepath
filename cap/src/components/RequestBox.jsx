 import { useState } from "react";
import axios from "axios";
import DogImage from "./DogImage";
import "./RequestBox.css";


const DOG_API_KEY = "live_CQuXcCQyWgE9thIz66v3beOfQgcDRka9vxnurjMi7SySFKcrEa4keP1IOGHBuFn6"

export default function RequestBox( {onBanAttribute, banAttributes} ) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [breedInfo, setBreedInfo] = useState(null);


  async function fetchDogImage() {
  setLoading(true);
  setError(null);

  try {
    const response = await axios.get("https://api.thedogapi.com/v1/images/search", {
      headers: {
        "x-api-key": DOG_API_KEY,
      },
      params: { limit: 1, size: "med", include_breeds: true },
    });

    const data = response.data[0];

 
    if (!data || !data.breeds || data.breeds.length === 0) {
      console.log("❌ No breed info found. Retrying...");
      fetchDogImage();
      return;
    }

    const breed = data.breeds[0];
    const breedValues = [
      breed.name,
      breed.origin,
      breed.weight?.metric,
      breed.life_span,
    ].map(String);


    const isBanned = breedValues.some((val) => banAttributes.includes(val));
    if (isBanned) {
      console.log("🚫 Banned breed attribute detected. Retrying...");
      fetchDogImage();
      return;
    }


    setImageUrl(data.url);
    setBreedInfo({
      breed: breed.name || "Unknown",
      origin: breed.origin || "Unknown",
      weight: breed.weight?.metric || "Unknown",
      lifespan: breed.life_span || "Unknown",
    });

    console.log("✅ Dog loaded:");
    console.log("🐾 Breed:", breed.name);
    console.log("🌍 Origin:", breed.origin);
    console.log("⚖️ Weight (kg):", breed.weight?.metric);
    console.log("📅 Lifespan:", breed.life_span);
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
        <button 
          className="info-button"
          onClick={() => onBanAttribute(breedInfo.breed)}
        >
          Breed: {breedInfo.breed}
        </button>

        <button 
          className="info-button"
          onClick={() => onBanAttribute(`${breedInfo.weight} kg`)}
        >
          Weight: {breedInfo.weight} kg
        </button>

        <button 
          className="info-button"
          onClick={() => onBanAttribute(breedInfo.lifespan)}
        >
          Lifespan: {breedInfo.lifespan}
        </button>
      </div>
    )}
  </div>
)}
