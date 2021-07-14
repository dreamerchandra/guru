import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ReactComponent as Close } from "../../../asserts/svg/close.svg";
import { MODEL, withModelListener } from "../../../Hoc/Model";
import api from "../../../js/api";
import InputClip from "../../ClipInput";
import Notification from "../../Notification";

function Batch({ hideModel }) {
  const [fields, setFields] = useState({
    email: [],
  });

  const queryClient = useQueryClient();

  const createChapter = useMutation(api.batch.create, {
    onSuccess: () => {
      toast.dark(<Notification showSuccessIcon text="Success" />);
      hideModel();
      queryClient.invalidateQueries("my.batches");
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
        <h1>New Batch</h1>
        <Close onClick={hideModel} />
      </div>
      <div className="body">
        <InputClip
          label="Student"
          type="text"
          clips={fields.email}
          setClips={setField("email")}
        />
      </div>
      <div className="footer">
        <button
          disabled={createChapter.isLoading}
          onClick={() => createChapter.mutate(fields.email)}
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default withModelListener(Batch, MODEL.BATCHES);
