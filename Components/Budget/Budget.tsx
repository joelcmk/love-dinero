import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './Budget.module.css';
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineCreditCard,
  AiOutlineCar,
  AiOutlineAppstoreAdd,
} from 'react-icons/ai';
import { IoFastFoodOutline } from 'react-icons/io5';
import { TbFridge } from 'react-icons/tb';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

function Budget({ expenses, demo }) {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [target, setTarget] = useState(false);

  const [home, setHome] = useState(0);
  const [food, setFood] = useState(0);
  const [shopping, setShopping] = useState(0);
  const [transportation, setTransportation] = useState(0);
  const [utilities, setUtilities] = useState(0);
  const [household, setHousehold] = useState(0);
  const [other, setOther] = useState(0);

  const [targets, setTargets] = useState([]);

  useEffect(() => {
    if (!demo) {
      const fetchTarget = async () => {
        const { data: target2, error } = await supabase
          .from('target2')
          .select('*')
          .order('id', { ascending: true });

        if (error) console.log('error', error);
        else setTargets(target2);
        setHome(target2[0].home);
        setFood(target2[0].food);
        setShopping(target2[0].shopping);
        setTransportation(target2[0].transportation);
        setUtilities(target2[0].utilities);
        setHousehold(target2[0].household);
        setOther(target2[0].other);
      };

      fetchTarget();
    }
  }, [supabase]);

  const handleTarget = async () => {
    if (targets[0]) {
      const { data: target2, error } = await supabase
        .from('target2')
        .update({
          home: home,
          shopping: shopping,
          food: food,
          transportation: transportation,
          utilities: utilities,
          household: household,
          other: other,
        })
        .eq('user_id', user.id);
    } else {
      const { data: target2, error } = await supabase
        .from('target2')
        .insert({
          user_id: user.id,
          home: home,
          shopping: shopping,
          food: food,
          transportation: transportation,
          utilities: utilities,
          household: household,
          other: other,
        })
        .select()
        .single();

      if (error) {
        console.log(error.message);
      } else {
        setTargets([target2]);
      }
    }
  };

  function total(expense) {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
      if (expenses[i].category === expense) {
        total += expenses[i].amount;
      }
    }
    return total;
  }

  return (
    <div className={styles.budget}>
      <div className={styles.wrapper}>
        <table className={styles.expenses}>
          <tbody>
            <tr>
              <th>Category</th>
              <th>Expenses</th>
              <th>Target</th>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<AiOutlineHome />} <p style={{ marginLeft: '1em' }}>Home</p>
                </div>{' '}
              </td>
              <td>${total('home')}</td>
              <td>
                {!target ? (
                  `$${home || 0}`
                ) : (
                  <input
                    type="number"
                    value={home}
                    onChange={(e) => setHome(e.target.value)}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<IoFastFoodOutline color="#0989F8" />}{' '}
                  <p style={{ marginLeft: '1em' }}>Food</p>
                </div>
              </td>
              <td>${total('food')}</td>
              <td>
                {!target ? (
                  `$${food || 0}`
                ) : (
                  <input
                    type="number"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<AiOutlineShopping />}
                  <p style={{ marginLeft: '1em' }}>Shopping</p>
                </div>
              </td>

              <td>${total('shopping')}</td>
              <td>
                {!target ? (
                  `$${shopping || 0}`
                ) : (
                  <input
                    type="number"
                    value={shopping}
                    onChange={(e) => setShopping(e.target.value)}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<AiOutlineCreditCard color="#FE8D00" />}
                  <p style={{ marginLeft: '1em' }}>Utilities</p>
                </div>
              </td>
              <td>${total('utilities')}</td>
              <td>
                {!target ? (
                  `$${utilities || 0}`
                ) : (
                  <input
                    type="number"
                    value={utilities}
                    onChange={(e) => setUtilities(e.target.value)}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<TbFridge />}
                  <p style={{ marginLeft: '1em' }}>Household</p>
                </div>
              </td>
              <td>${total('household')}</td>
              <td>
                {!target ? (
                  `$${household || 0}`
                ) : (
                  <input
                    type="number"
                    value={household}
                    onChange={(e) => setHousehold(e.target.value)}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<AiOutlineCar color="#46D7A8" />}
                  <p style={{ marginLeft: '1em' }}>Transportation</p>
                </div>
              </td>
              <td>${total('transportation')}</td>
              <td>
                {!target ? (
                  `$${transportation || 0}`
                ) : (
                  <input
                    value={transportation}
                    onChange={(e) => setTransportation(e.target.value)}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {<AiOutlineAppstoreAdd />}
                  <p style={{ marginLeft: '1em' }}>Other</p>
                </div>
              </td>
              <td>${total('other')}</td>
              <td>
                {!target ? (
                  `$${other || 0}`
                ) : (
                  <input
                    type="number"
                    value={other}
                    onChange={(e) => setOther(e.target.value)}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>
                <Button
                  onClick={() => {
                    setTarget(!target);
                    if (!demo) {
                      target && handleTarget();
                    }
                  }}
                  variant="update"
                >
                  {!target ? 'Update' : 'Done'}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Budget;
