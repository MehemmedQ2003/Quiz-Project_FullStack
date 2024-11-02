// src/components/SurahDetail.jsx
import React from "react";

const SurahDetail = ({ surah }) => {
  if (!surah || !surah.ayahs) {
    return <p>Loading surah details...</p>;
  }

  return (
    <div>
      <h2>{surah.name}</h2>
      <ul>
        {surah.ayahs.map((ayah) => (
          <li key={ayah.number}>
            <p>
              <strong>Ayah {ayah.number}:</strong>
            </p>
            <p>
              <strong>Arabic:</strong> {ayah.arabic_text}
            </p>
            <p>
              <strong>Translation:</strong> {ayah.translation}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurahDetail;
