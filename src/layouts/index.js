import { Layout } from 'antd';
// import styles from './index.css';

function BasicLayout(props) {
  return (
    <Layout style={{ height: '100%' }}>
      {props.children}
    </Layout>
  );
}

export default BasicLayout;
