import React, { useState, createContext, useCallback, useContext, useEffect } from "react";

const ModelContext = createContext();

export const MODEL = {
  CHAPTER: "chapter",
  FOLDER: "folder",
  BATCHES: "batches",
  CONCEPT_CARD: "conceptCards",
  QUESTION_CARD: "questionCards",
  CHOOSE_CATEGORY: "CHOOSE_CATEGORY",
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

  const DEFAULT_AUTO_CLOSE = true;
  const IDLE_OPEN_WINDOW = 10_000;

  const [autoClose, setAutoClose] = useState(DEFAULT_AUTO_CLOSE);
  const [lastClose, setLastClose] = useState(0);

  const showModel = useCallback((type, info = {}) => {
    checkModel(type);
    setModel({ show: true, type, info });
    const openTime = new Date();
    const reOpenedWithin = openTime - lastClose;
    if (reOpenedWithin < IDLE_OPEN_WINDOW) {
      setAutoClose(false);
    }
  }, [lastClose]);

  const hideModel = useCallback(({ autoClose }) => {
    setModel({ show: false, type: MODEL.NA, info: {} });
    if (autoClose) {
      setLastClose(new Date());
    } else {
      setAutoClose(true);
    }
  }, []);

  return (
    <ModelContext.Provider
      value={{ model, showModel, hideModel, setAutoClose, autoClose }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  const { showModel, hideModel, model, autoClose } = useContext(ModelContext);
  return { showModel, hideModel, model, autoClose };
};

export const withModelListener = (Component, type) => {
  checkModel(type);

  const ModelPopper = (props) => {
    const { hideModel, model, showModel, autoClose } = useModel();

    if (!model.show) return null;

    if (model.type === type) {
      return (
        <Component
          {...props}
          hideModel={hideModel}
          showModel={showModel}
          model={model}
          autoClose={autoClose}
        />
      );
    }

    return null;
  };

  return ModelPopper;
};
