import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {showUpdate} from '../../../actions/content';

const ContentUpdater = (props) => {
  const content = props.payload.content || [];

  useEffect(() => {
    (async () => {
      props.showUpdate(content);
    })();
  }, [props.payload.content]);

  return <div></div>;
};

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  {showUpdate}
)(ContentUpdater);
