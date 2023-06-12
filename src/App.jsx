import axios from "axios";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "black",
    minWidth: 300,
    minHeight: 300,
  },
};

ReactModal.setAppElement("#root");

const App = () => {
  const [id, setId] = useState(0);
  const [disneyData, setDisneyData] = useState({ data: [], info: {} });
  const [detailData, setDetailData] = useState({});
  const { nextPage, previousPage } = disneyData?.info || {};

  const fetchData = async (url) => {
    const response = await axios.get(url);
    if (response.statusText === "OK") {
      setDisneyData(response.data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.disneyapi.dev/character/${id}`
      );
      if (response.statusText === "OK") {
        setDetailData(response.data);
      }
    };

    if (id) {
      fetchData(`https://api.disneyapi.dev/character/${id}`);
    }
  }, [id]);

  useEffect(() => {
    fetchData("https://api.disneyapi.dev/character");
  }, []);

  return (
    <>
      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => fetchData(previousPage)}
          disabled={!previousPage}
        >
          previous
        </button>
        <button onClick={() => fetchData(nextPage)} disabled={!nextPage}>
          next
        </button>
      </div>
      <div style={{ padding: 10, display: "flex", flexWrap: "wrap", gap: 30 }}>
        {disneyData.data?.map((char) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setId(char._id)}
            key={char._id}
          >
            <img height={300} src={char.imageUrl} alt={char.name} />
            <div>{char.name}</div>
          </div>
        ))}
      </div>
      <ReactModal
        isOpen={Boolean(id)}
        onRequestClose={() => setId(0)}
        style={customStyles}
        contentLabel="Detail Modal"
      >
        <div>{detailData.data?.name}</div>
        <div>
          Films:{" "}
          {detailData.data?.films.map((film) => (
            <span key={film}>{film},</span>
          ))}
        </div>
      </ReactModal>
    </>
  );
};

export default App;
