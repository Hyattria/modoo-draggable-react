import React from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components';

const Container = styled.div`
  color: blue;
`;

const App = () => {
  return <Container>312312312</Container>;
};

ReactDOM.render(<App />, document.getElementById('app'));
