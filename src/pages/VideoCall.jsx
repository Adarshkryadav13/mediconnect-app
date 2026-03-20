import { useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { AuthContext } from "../context/AuthContext";

function VideoCall() {
  const { roomId } = useParams();
  const { user } = useContext(AuthContext);

  const zpRef = useRef(null);

  useEffect(() => {
    if (!roomId || !user) return;

    console.log("ROOM ID:", roomId);
    console.log("USER:", user);

    const appID = 1562408201;   
    const serverSecret = "ee7fd62a97abeb4f610acf7a3ba60d75";


    const userID = Date.now().toString(); 
    const userName = user.username;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zpRef.current = zp;

    zp.joinRoom({
      container: document.getElementById("video-container"),
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showPreJoinView: false,
    });

    return () => {
      if (zpRef.current) {
        zpRef.current.destroy();
        zpRef.current = null;
      }
    };

  }, [roomId, user]);

  return (
    <div className="w-full h-screen bg-black">
      <div id="video-container" className="w-full h-full"></div>
    </div>
  );
}

export default VideoCall;
