import React, { useState, createContext, useCallback, useContext } from "react";

const ModelContext = createContext();

export const MODEL = {
  CHAPTER: "chapter",
  FOLDER: "folder",
  BATCHES: "batches",
  NA: "na",
};

const checkModel = (type) => {
  if (!Object.values(MODEL).includes(type)) {
    throw new Error(
      `showModel expected one of ${Object.values(MODEL)} but got ${type}`
    );
  }
};

export const ModelProvider = ({ children }) => {
  const [model, setModel] = useState({
    show: false,
    type: MODEL.NA,
  });

  const showModel = useCallback((type) => {
    checkModel(type);
    setModel({ show: true, type });
  }, []);

  const hideModel = useCallback(() => {
    setModel({ show: false, type: MODEL.NA });
  }, []);

  return (
    <ModelContext.Provider value={{ model, showModel, hideModel }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  const { showModel, hideModel, model } = useContext(ModelContext);
  return { showModel, hideModel, model };
};

export const withModelListener = (Component, type) => {
  checkModel(type);

  const ModelPopper = (props) => {
    const { hideModel, model } = useModel();

    if (!model.show) return null;

    if (model.type === type) {
      return <Component {...props} hideModel={hideModel} />;
    }

    return null;
  };

  return ModelPopper;
};
