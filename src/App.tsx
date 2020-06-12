import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import { WildlyArrogant } from "./components";

const GOOGLE_MARCO_URL = "https://script.google.com/macros/s/AKfycbxf6RbMgUDvM82LudhJLUdaogyp5yKVVp6rMu8SyE0IE3rWQcej/exec";

const App = () => {
  const [messageThemeType, setMessageThemeType] = useState<WildlyArrogant.ThemeType>(0);
  const [messageThemeIndex, setMessageThemeIndex] = useState(0);
  const [messageText, setMessageText] = useState("");
  const [messageImageUrl, setMessageImageUrl] = useState("");
  const [{ facebookPostId, isCreatingPost }, setPostState] = useState({ facebookPostId: "", isCreatingPost: false });
  const setFacebookPostId = (facebookPostId: string) => setPostState({ facebookPostId, isCreatingPost });
  const setIsCreatingPost = (isCreatingPost: boolean) => setPostState({ facebookPostId, isCreatingPost });
  const messageThemeName = WildlyArrogant.themeNames[messageThemeIndex];
  const messageThemeColor = WildlyArrogant.themeColors[messageThemeIndex];
  const headerStyle = { color: messageThemeColor };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(event.target.value);
  };

  const handleTextImageRender = (imageUrl: string) => {
    setMessageImageUrl(imageUrl);
  };

  const handleSubmit = () => {
    setIsCreatingPost(true);
  };

  const handleGoBack = () => {
    setFacebookPostId("");
  };

  const chooseThemeColorStyle = {
    maxWidth: WildlyArrogant.themeColors.length * 90,
  };

  const chooseThemeTypeStyle = {
    maxWidth: 5 * 90,
  };

  useEffect(() => {
    if (!isCreatingPost) {
      return;
    }

    const createPost = async () => {
      const formData = new FormData();

      formData.append("text", messageText);
      formData.append("type", messageThemeName);
      formData.append("image", messageImageUrl);

      const response = await Axios.post(GOOGLE_MARCO_URL, formData);

      if (response.data.status !== "error") {
        setPostState({
          facebookPostId: response.data.postId,
          isCreatingPost: false,
        });
      }
      else if (response.data.message === "service unavailable") {
        const { timeRemains } = response.data;
        setTimeout(createPost, timeRemains);
      }
    };

    createPost();
  });

  if (isCreatingPost) {
    const style = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column" as "column",
      width: "100vw",
      height: "100vh",
    };

    return (
      <div style={style}>
        <div id="loading"></div>
        <div className="blink" style={{ marginTop: 10 }}>正在建立貼文...</div>
      </div>
    );
  }

  if (facebookPostId) {
    const width = Math.floor(window.innerWidth * 0.9);

    const style = {
      display: "block",
      border: "none",
      overflow: "hidden",
      margin: "0 auto",
    };

    return (
      <>
        <header style={headerStyle}>{messageThemeName}</header>
        <main>
          <iframe
            title="facebook 貼文"
            src={`https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FWildly.Arrogant%2Fposts%2F${facebookPostId}%3A0&width=${width}`}
            width={width}
            height={width}
            style={style}
            scrolling="no"
            frameBorder="0"
            allowTransparency={true} />
        </main>
        <footer>
          <input type="button" value="返回" onClick={handleGoBack} />
        </footer>
      </>
    );
  }

  return (
    <>
      <header style={headerStyle}>{messageThemeName}</header>
      <main>
        <textarea value={messageText} placeholder="你最近最狂的事情是什麼?" onChange={handleTextareaChange} />

        <ul id="choose-theme-color" className="choose" style={chooseThemeColorStyle}>
          {WildlyArrogant.themeNames.map((themeName, themeIndex) => {
            const style = {
              color: WildlyArrogant.themeColors[themeIndex],
              opacity: (themeIndex === messageThemeIndex) ? 1 : 0.4,
            };

            const handleClick = () => setMessageThemeIndex(themeIndex);
            return <li key={themeIndex} style={style} onClick={handleClick}>{themeName}</li>;
          })}
        </ul>

        <ul id="choose-theme-type" className="choose" style={chooseThemeTypeStyle}>
          {WildlyArrogant.ThemeTypeNames.map((themeTypeName, themeType) => {
            const style = {
              opacity: (themeType === messageThemeType) ? 1 : 0.4,
            };

            const handleClick = () => setMessageThemeType(themeType);
            return <li key={themeType} style={style} onClick={handleClick}>{themeTypeName}</li>;
          })}
        </ul>

        <WildlyArrogant.TextImage
          text={messageText || "你最近在狂什麼?"}
          themeType={messageThemeType}
          themeColor={WildlyArrogant.themeColors[messageThemeIndex]}
          onRender={handleTextImageRender} />
      </main>
      <footer>
        <input type="button" value="送出" onClick={handleSubmit} />
      </footer>
    </>
  );
};

export default App;
