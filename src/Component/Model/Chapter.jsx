import React, { useState } from "react";
import { MODEL, withModelListener } from "../../Hoc/Model";
import Input from "../Input";
import { ReactComponent as Close } from "../../asserts/svg/close.svg";
import InputClip from "../ClipInput";
import Select from "../Select";
import api, { paginate, queryConfig } from "../../js/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Notification from "../Notification";

const getId = ({id}) => id

function Chapter({ hideModel, autoClose, model: { info = {} } }) {
  const { id: chapterId = null } = info;
  const initialState = {
    title: info.title || "",
    titleImg: info.titleImg || null,
    tag: info.tag || [],
    category: info.category ?? [],
    folders: info.folders ?? [],
  };

  const [fields, setFields] = useState(initialState);

  const { data: categoryData = [] } = useQuery(
    "my.category",
    api.category.getMine,
    queryConfig
  );
  const { data: folderData = [] } = useQuery(
    "my.folder",
    api.folder.getMine,
    queryConfig
  );

  const queryClient = useQueryClient();

  const createChapter = useMutation(api.chapter.upsert, {
    onSuccess: () => {
      toast.dark(<Notification showSuccessIcon text="Success" />);
      autoClose && hideModel({autoClose: true});
      paginate.chapter.invalidateLastPage();
      queryClient.invalidateQueries("my.chapter");
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
        <h1>New Chapter</h1>
        <Close onClick={hideModel} />
      </div>
      <div className="body">
        <div
          style={{
            display: "flex",
            gap: "7px",
            justifyContent: "space-between",
          }}
        >
          <Input
            label="Title"
            type="text"
            value={fields.title}
            setValue={setField("title")}
          />
          <Input
            label="Img"
            type="file"
            value={fields.titleImg}
            setValue={setField("titleImg")}
            inputProps={{ accept: "image/*" }}
          />
        </div>
        <InputClip
          label="Tag"
          type="text"
          clips={fields.tag}
          setClips={setField("tag")}
        />
        <Select
          label="Category"
          values={fields.category}
          setValue={setField("category")}
          options={categoryData}
          keyLabel="id"
          displayLabel="label"
        />
        <Select
          label="Folder"
          values={fields.folders}
          setValue={setField("folders")}
          options={folderData}
          keyLabel="id"
          displayLabel="title"
        />
      </div>
      <div className="footer">
        <button
          disabled={createChapter.isLoading}
          onClick={() => createChapter.mutate({ fields, chapterId })}
        >
          Save
        </button>
      </div>
    </section>
  );
}

export default withModelListener(Chapter, MODEL.CHAPTER);
