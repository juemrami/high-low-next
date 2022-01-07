import React from "react";
const customStyles = {
  mainButton: `
      w-[200px]
      h-[50px]
      shadow-md
      border-[1px] rounded-lg border-solid border-gray
      self-centers
      self-align-center
      flex
      flex-col
      align-items-center
      text-[1.3rem]
      bg-gray
      hover:text-gold hover:border-gold hover:cursor-pointer
  `,
};
const MainMenu = ({handleNewLobby, handleJoinLobby}) => {
  return (
    <>
      <div
        className={`
              flex-1 flex
              grid grid-cols-1 gap-10
              max-h-[600px]
              content-center
              justify-items-center
              justify-around
              border rounded-[50px]
              pb-[3rem] pt-[4.5rem]`}
      >
        <div className={customStyles.mainButton}
        onClick={()=>{handleNewLobby();}}>
          <text className="pl-3 pr-3 pt-1.5 self-center">Deploy new Lobby</text>
        </div>
        <div className="flex self-center items-center text-[2em] text-gold">
          <text className="pl-3 pr-3">or</text>
        </div>
        <div className={customStyles.mainButton}
        onClick={()=> {handleJoinLobby();}}>
          <text className="pl-3 pr-3 pt-1.5 self-center">Join Lobby</text>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
