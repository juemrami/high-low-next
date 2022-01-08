import { FixedNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { useInput } from "../custom-hooks/input-hook";
interface Props {
  deployContractHandler: any;
}
export interface Args{
  rollSize: number
}
const customStyles = {
  
  label: "",
  submit: ``,
  mainButton: `
      w-[100px]
      h-[50px]
      shadow-md
      border-[1px] rounded-lg border-solid border-gray
      self-center
      self-align-center
      flex
      flex-col
      align-items-center
      text-[1.3rem]
      bg-gray
      hover:text-gold hover:border-gold hover:cursor-pointer
  `,
};
const AddLobbyInterface = (props: Props) => {
  let args:Args;
  const { deployContractHandler } = props;
  //const [args, setArgs] = useState<Args>({rollSize: undefined });
  const { value:rollSize, bind, reset } = useInput('');
  useEffect(() =>{
    args = {
      rollSize: Number(rollSize)
    }
    console.log(args.rollSize)
  },[rollSize]);
  return (
    <>
      <div className="flex flex-col">
        <div
          className={`
              grid grid-cols-1 gap-5
              h-[600px]
              w-[900px]
              self-center
              justify-items-center
              border rounded-[50px]
              pb-[3rem] pt-[4.5rem]
          `}
        >
          <div
            className="h-[50px] w-[280px]
            border rounded-lg border-lightgray
            flex
            overflow-hidden-
           bg-gray"
          >
            <div
              className="
                absolute
                pointer-events-none
            
                ml-[0px] w-[100px]
                hover:leading-loose
                flex
                bg-gray
                h-[48px] justify-self-start
                justify-center
                text-lg
                text-white font-semibold
                self-center
                items-center
                rounded-l-lg
              "
            >
              Roll Size
            </div>
            <input
              id="rollSize"
              type="number"
              placeholder="uint256"
              value={rollSize}
              onChange={e => bind.onChange(e)}
              className={`
              flex-1
              self-stretch
              rounded-lg
              max-w-[280px]
              justify-self-center
              pl-[120px]
              pr-[1px]
              text-lg
              outline-none
              ring-lightgray
              ring-2
              focus:ring-gold focus:ring-2
              hover:ring-gold hover:ring-2
              bg-lightgray
              `}
            />
          </div>
          <div
            onClick={() => deployContractHandler(args)}
            className={customStyles.mainButton}
          >
            <text className="pl-3 pr-3 pt-1.5 self-center">Deploy</text>{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLobbyInterface;
