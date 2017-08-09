import React from 'react';
import { connect } from 'dva';
import styles from './Todos.css';

function switchState(props, idx) {
  props.dispatch({ type: 'todo/state', payload: idx });
}

const Todos = (props) => {
  const items = props.todo.items.map((item, idx) => {
    return (<div
      className={item.state === 1 ? styles.linegood : styles.linedeleted}
      key={idx}
      onClick={switchState.bind(null, props, idx)}
    >
      {item.cnt}
    </div>);
  });
  return (
    <div className={styles.outline}>
      {items}
    </div>
  );
};

Todos.propTypes = {
};

export default connect(
  (state) => {
    return { todo: state.todo };
  },
)(Todos);
