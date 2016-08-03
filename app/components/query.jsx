import React from 'react';
import { connect } from 'react-redux';
import { getGraph } from '../actions/actions';

class Query extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.dispatch(getGraph("{user(id: 1) {id, name}}"));
  }

  render() {
    let dispatch = this.props.dispatch;
    let fetchInProgress = String(this.props.store.get('fetching'));
    let queryText;
    let user = this.props.store.get('data')
                       .toObject();
    return (
      <div>
        <p>Fetch in progress: {fetchInProgress}</p>
        <h3>{ user.name }</h3>
        <p>{ user.id }</p>
        <input ref={node => {
          queryText = node
        }}/>
        <button onClick={() => {
          dispatch(getGraph(queryText.value))
        }}>
          query
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    store: state
  }
};

export const QueryContainer = connect(
  mapStateToProps
)(Query);
