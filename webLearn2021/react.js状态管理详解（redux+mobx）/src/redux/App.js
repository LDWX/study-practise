import React, { useEffect, useState } from 'react';
import Context from './Context'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';


function App({ count, add, dispatch, remove }) {
  const onAdd = () => {
    add(2);
  };
  return (
    <div>
      Redux<button onClick={onAdd}>++ {count}</button>
      remove<button onClick={remove}>remove</button>
      Context: <Context />
    </div>
  );
}

const mapStateToProps = state => ({
  count: state.count,
});

// action.js
export function add(payload) {
  
  return { type: 'ADD', payload };
}
export function remove(payload) {
  return (dispatch, getState) => {
    dispatch({ type: 'LOADING' });
    fetch(payload).then(data => {
       dispatch({ type: 'LOADED' });
       dispatch({ type: 'DECREMENT', payload: data });
    }).catch(err => {
       dispatch({ type: 'ERROR', payload: err });
    });
  }
}

const actions = { add, remove };

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(actions, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(App)


