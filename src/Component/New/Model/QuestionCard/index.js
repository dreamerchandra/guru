import React, { useState } from 'react';
import { ReactComponent as Close } from "../../../../asserts/svg/close.svg";
import { MODEL, withModelListener } from '../../../../Hoc/Model';
import Mcq from './Mcq';

export const QUESTION_TYPE = {
  MCQ: 'mcq',
  MATCH: 'match',
}


const Option = ({ modelProp }) => {
  const [option, setOption] = useState(modelProp.model.info?.type ?? null);
  return (
    <>
      {
        option === QUESTION_TYPE.MCQ && <Mcq {...modelProp} />
      }
      {
        option === QUESTION_TYPE.MATCH && null
      }
      {
        !option &&
        (
          <div className="footer">
            <button className="primary" onClick={() => setOption(QUESTION_TYPE.MCQ)}>Mcq</button>
            <button className="secondary" onClick={() => setOption(QUESTION_TYPE.MATCH)}>Match</button>
          </div>
        )
      }
    </>
  )
}

function QuestionCard (props) {

  const { hideModel } = props

  return (
    <section className="modelHolder">
      <div className="header">
        <h1>New Q-Card</h1>
        <Close onClick={hideModel} />
      </div>
      <Option modelProp={props} />
    </section>
  )
}


export default withModelListener(QuestionCard, MODEL.QUESTION_CARD)