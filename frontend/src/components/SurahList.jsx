// src/components/SurahList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import SurahDetail from "./SurahDetail";

const SurahList = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/surahs/");
        setSurahs(response.data);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      }
    };
    fetchSurahs();
  }, []);

  const handleSurahClick = async (surahId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/surahs/${surahId}/`
      );
      setSelectedSurah(response.data);
    } catch (error) {
      console.error("Error fetching surah details:", error);
    }
  };

  return (
    <div>
      <h1>Surahs</h1>
      <ul>
        {surahs.map((surah) => (
          <li key={surah.id}>
            <button onClick={() => handleSurahClick(surah.id)}>
              {surah.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedSurah && <SurahDetail surah={selectedSurah} />}
    </div>
  );
};

export default SurahList;
