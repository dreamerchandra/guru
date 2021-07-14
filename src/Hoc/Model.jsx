import React, { useState, createContext, useCallback, useContext } from "react";

const ModelContext = createContext();

export const MODEL = {
  CHAPTER: "chapter",
  FOLDER: "folder",
  BATCHES: "batches",
  CONCEPT_CARD: "conceptCards",
  QUESTION_CARD: "questionCards",
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
    info: {},
  });

  const showModel = useCallback((type, info = {}) => {
    checkModel(type);
    setModel({ show: true, type, info });
  }, []);

  const hideModel = useCallback(() => {
    setModel({ show: false, type: MODEL.NA, info: {} });
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
    const { hideModel, model, showModel } = useModel();

    if (!model.show) return null;

    if (model.type === type) {
      return (
        <Component
          {...props}
          hideModel={hideModel}
          showModel={showModel}
          model={model}
        />
      );
    }

    return null;
  };

  return ModelPopper;
};
