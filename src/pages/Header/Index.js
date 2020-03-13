import React, { useState } from 'react';
// import fetch from 'dva/fetch';
import { Button } from 'antd';
import { connect, fetch } from 'dva';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = props => {
  const [loading, setLoading] = useState(false);
  const {
    preview: { previewData, seletedData },
  } = props;

  const handleDownloadPage = () => {
    setLoading(true);
    const data = previewData.map(item => {
      const {
        type,
        propsValue: { children, ...otherProps },
      } = item;
      return { type, children, ...otherProps };
    });

    fetch('http://localhost:4000/page/download', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ data }),
    }).then(response => {
      response.blob().then(blob => {
        setLoading(false);

        const aLink = document.createElement('a');
        document.body.appendChild(aLink);
        aLink.style.display = 'none';
        const objectUrl = window.URL.createObjectURL(blob);
        aLink.href = objectUrl;
        aLink.download = 'dist';
        aLink.click();
        document.body.removeChild(aLink);
      });
    });
  };
  return (
    <Flex>
      <div>前端微页面</div>
      <Button type="primary" onClick={handleDownloadPage} loading={loading}>
        下载页面
      </Button>
    </Flex>
  );
};

export default connect(({ preview }) => ({
  preview,
}))(Header);
