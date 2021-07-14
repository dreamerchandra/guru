import React, { useState } from 'react';
import { ReactComponent as Close } from "../../../../asserts/svg/close.svg";
import { MODEL, withModelListener } from '../../../../Hoc/Model';
import Mcq from './Mcq';


const Option = ({ modelProp }) => {
  const [option, setOption] = useState(null);
  return (
    <>
      {
        option === 'mcq' && <Mcq {...modelProp} />
      }
      {
        option === 'match' && null
      }
      {
        !option &&
        (
          <div className="footer">
            <button className="primary" onClick={() => setOption('mcq')}>Mcq</button>
            <button className="secondary" onClick={() => setOption('match')}>Match</button>
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