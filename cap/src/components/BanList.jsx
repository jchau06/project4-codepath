import "./BanList.css"; 

export default function BanList({ banAttributes, onUnbanAttribute }) {

  return (
    <div className="ban-list">
      <h3>Banned Attributes</h3>
      <h4>Select an attribute in your listing to ban it.</h4>
      <div className="ban-list-buttons">
        {banAttributes.map((attr) => (
          <button
            key={attr}
            className="ban-list-button"
            onClick={() => onUnbanAttribute(attr)}
            title="Click to remove from ban list"
          >
            {attr} ✕
          </button>
        ))}
      </div>
    </div>
  );
}
