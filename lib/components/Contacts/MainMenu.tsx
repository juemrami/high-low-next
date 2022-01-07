import React from "react";
import "tailwindcss/tailwind.css";
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
  container: `
  grid grid-cols-1 gap-5
  flex-1 flex
  content-center
  max-h-[600px]
  border-[1px] border-solid rounded-xl
  justify-items-center
    justify-around
        pb-[3rem] pt-[4.5rem]`,
};
interface Props {
  handleNewLobby: any;
  handleJoinLobby: any;
}
const MainMenu = (props: Props) => {
  const { handleNewLobby, handleJoinLobby } = props;
  return (
    <>
      <div
        className={customStyles.mainButton}
        onClick={() => {
          handleNewLobby();
        }}
      >
        <text className="pl-3 pr-3 pt-1.5 self-center">Deploy new Lobby</text>
      </div>
      <div className="flex self-center items-center text-[2em] text-gold">
        <text className="pl-3 pr-3">or</text>
      </div>
      <div
        className={customStyles.mainButton}
        onClick={() => {
          handleJoinLobby();
        }}
      >
        <text className="pl-3 pr-3 pt-1.5 self-center">Join Lobby</text>
      </div>
    </>
  );
};

export default MainMenu;
