import "./DogImage.css"; // for styles, we'll add that below

export default function DogImage({ imageUrl }) {
  if (!imageUrl) return null;

  return (
    <div className="dog-image-wrapper">
      <img 
        src={imageUrl} 
        alt="Random Dog" 
        className="dog-image"
      />
    </div>
  );
}
