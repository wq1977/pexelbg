import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import TodoList from '../components/Todos.js';

function changeInputBuffer(dispatch, event) {
  dispatch({ type: 'todo/buffer', payload: event.target.value });
}

function handleKeyPress(props, event) {
  if (event.charCode === 13) {
    props.dispatch({ type: 'todo/buffer', payload: '' });
    props.dispatch({ type: 'todo/add', payload: props.todo.inputBuffer });
  }
}

function IndexPage(Props) {
  const idx = Math.floor(Math.random() * window.bgimages.length);
  const url = window.bgimages[idx];
  return (
    <div className={styles.normal}>
      <div className={styles.main}>
        <div
          className={styles.submain}
          style={{ backgroundImage: `url(${url})` }}
        >
          <TodoList />
        </div>
        <input
          className={styles.input}
          onChange={changeInputBuffer.bind(null, Props.dispatch)}
          onKeyPress={handleKeyPress.bind(null, Props)}
          value={Props.todo.inputBuffer}
          placeholder="今天有什么需要做的？"
        />
      </div>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect((state) => {
  return { todo: state.todo };
})(IndexPage);
