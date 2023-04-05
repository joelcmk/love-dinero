import React, { useState, useEffect } from 'react';

function Budget() {
  const [target, setTarget] = useState(true);

  const [updateTarget, setUpdateTarget] = useState(false);

  if (target) {
    return (
      <>
        <div className="budget">
          <div className="test">
            <table className="expenses">
              <tr>
                <th>Category</th>
                <th>Expenses</th>
                <th>Target</th>
              </tr>

              <>
                <tr>
                  <td>Name</td>
                  <td>
                    <span>$</span>
                    222
                  </td>
                  <td>
                    <div className="edit">
                      <p className="">
                        <span>$</span>0
                      </p>
                    </div>
                    ) : (
                    <div>
                      <input type="number" className="input" />
                    </div>
                    )
                  </td>
                </tr>
              </>

              <tr>
                <td></td>
                <td></td>
                <td>
                  <button className="update_button">
                    {!updateTarget ? 'update' : 'done'}
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </>
    );
  } else {
    return <p>loading</p>;
  }
}

export default Budget;
