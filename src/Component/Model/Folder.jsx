import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ReactComponent as Close } from "../../asserts/svg/close.svg";
import { MODEL, withModelListener } from "../../Hoc/Model";
import api, { paginate } from "../../js/api";
import Input from "../Input";
import Notification from "../Notification";

function Folder({ hideModel }) {
  const [fields, setFields] = useState({
    title: "",
  });

  const queryClient = useQueryClient();
  const createFolder = useMutation(api.folder.create, {
    onSuccess: () => {
      toast.dark(<Notification showSuccessIcon text="Success" />);
      hideModel();
      paginate.folder.invalidateLastPage();
      queryClient.invalidateQueries("my.folder");
    },
    onError: (err) => {
      toast.dark(
        <Notification
          showSuccessIcon={false}
          text={`Failure due to error in ${err.code}`}
        />
      );
    },
  });

  const setField = (name) => (val) => {
    setFields((pre) => {
      const newState = typeof val === "function" ? val(pre[name]) : val;
      return {
        ...pre,
        [name]: newState,
      };
    });
  };

  return (
    <section className="modelHolder">
      <div className="header">
        <h1>New Folder</h1>
        <Close onClick={hideModel} />
      </div>
      <div className="body">
        <Input
          label="Title"
          type="text"
          value={fields.title}
          setValue={setField("title")}
        />
      </div>
      <div className="footer">
        <button
          disabled={createFolder.isLoading}
          onClick={() => createFolder.mutate(fields)}
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default withModelListener(Folder, MODEL.FOLDER);
