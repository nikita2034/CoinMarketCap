import React, { createContext, useContext, useState, ReactNode } from "react";

type MyContextType = {
  value: string;
  setValue: (value: string) => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

type MyContextProviderProps = {
  children: ReactNode;
};

export const MyContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [value, setValue] = useState("Initial Value");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
