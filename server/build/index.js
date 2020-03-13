import React from 'react';
import ReactDOM from 'react-dom';

import { renderComponentType } from '@components/index';
import styled from 'styled-components';

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
`;

const App = () => {
  const data = window.pageData;
  return (
    <Container>
      {data &&
        data.length &&
        data.map(item => {
          const { type, children, ...props } = item;
          const Preview = renderComponentType[type];
          return <Preview {...props} />;
        })}
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
