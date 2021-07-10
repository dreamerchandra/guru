import React, { useState } from "react";
import { MODEL, withModelListener } from "../../../Hoc/Model";
import Input from "../../Input";
import { ReactComponent as Close } from "../../../asserts/svg/close.svg";
import InputClip from "../../ClipInput";
import MultiSelect from "../../MultiSelect";

function Chapter({ hideModel }) {
  const [fields, setFields] = useState({
    title: "",
    titleImg: "",
    tag: [],
    category: [],
    folders: "",
  });

  const setField = (name) => (val) => {
    setFields((pre) => {
      let res = val;
      if (typeof val === "function") {
        res = val(pre[name]);
      }

      return {
        ...pre,
        [name]: res,
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
          />
        </div>
        <InputClip
          label="Tag"
          type="text"
          clips={fields.tag}
          setClips={setField("tag")}
        />
        <MultiSelect
          label="Category"
          values={fields.category}
          setValue={setField("category")}
          options={[
            "Oliver Hansen",
            "Van Henry",
            "April Tucker",
            "Ralph Hubbard",
            "Omar Alexander",
            "Carlos Abbott",
            "Miriam Wagner",
            "Bradley Wilkerson",
            "Virginia Andrews",
            "Kelly Snyder",
          ]}
        />
      </div>
    </section>
  );
}

export default withModelListener(Chapter, MODEL.CHAPTER);
