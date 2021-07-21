import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { ReactComponent as Close } from "../../../asserts/svg/close.svg";
import { MODEL, withModelListener } from "../../../Hoc/Model";
import api, { queryConfig } from "../../../js/api";
import InputClip from "../../ClipInput";
import MultiSelect from "../../MultiSelect";
import Notification from "../../Notification";

function ChooseCategory({ hideModel }) {
  const [fields, setFields] = useState({
    category: [],
  });

  const queryClient = useQueryClient();
  
  const createChapter = useMutation(api.user.create, {
    onSuccess: () => {
      toast.dark(<Notification showSuccessIcon text="Success" />);
      queryClient.invalidateQueries("my.user");
      hideModel();
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

  const { data: categoryData = [] } = useQuery(
    "my.category",
    api.category.getMine,
    queryConfig
  );

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
        <h1>Interested Category</h1>
        <Close onClick={hideModel} />
      </div>
      <div className="body">
        <MultiSelect
          label="Category"
          values={fields.category}
          setValue={setField("category")}
          options={categoryData}
          keyLabel="id"
          displayLabel="label"
        />
      </div>
      <div className="footer">
        <button
          disabled={createChapter.isLoading}
          onClick={() => createChapter.mutate(fields)}
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default withModelListener(ChooseCategory, MODEL.CHOOSE_CATEGORY);
