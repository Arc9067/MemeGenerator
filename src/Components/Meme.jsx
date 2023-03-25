import { useEffect, useState } from "react";

export default function Meme() {
  let [meme, setMeme] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemeImages, setAllMemeImages] = useState({});
  console.log(allMemeImages);
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => {
        let result = data.data.memes;
        setAllMemeImages(data);
      });
  }, []);

  function getMemeImage() {
    const memesArray = allMemeImages.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    setMeme((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }
  return (
    <main className="meme">
      <input
        type="text"
        placeholder="Enter Top Text"
        name="topText"
        onChange={handleChange}
        value={meme.topText}
      />
      <input
        type="text"
        placeholder="Enter Top Text"
        name="bottomText"
        onChange={handleChange}
        value={meme.bottomText}
      />
      <button onClick={getMemeImage} className="generate">
        Get a new meme image 🖼
      </button>
      <div className="img-div">
        {meme.randomImage && (
          <img src={meme.randomImage} alt="mem" className="memeImg" />
        )}
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText} </h2>
      </div>
    </main>
  );
}
