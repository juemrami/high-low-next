import React from "react";
import "tailwindcss/tailwind.css";
interface Props {
  deployContractHandler: any;
}
const customStyles = {
  label: "",
  submit: ``,
};
const AddLobbyInterface = (props: Props) => {
  const { deployContractHandler } = props;
  return (
    <>
      <div
        className={`
            border
            flex-1
            rounded-lg 
            min-w-[600px]
            min-h-[100px]`}
      >
        YOU SUCK
      </div>
      <button onClick={() => deployContractHandler()}> Click</button>
    </>
  );
};

export default AddLobbyInterface;
