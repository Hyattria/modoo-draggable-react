import { FontSizeOutlined, PictureOutlined } from '@ant-design/icons';

export default [
  {
    title: '基础组件',
    components: [
      {
        type: 'title_text',
        title: '标题文本',
        icon: props => <FontSizeOutlined {...props} />,
      },
      {
        type: 'image',
        title: '图片广告',
        icon: props => <PictureOutlined {...props} />,
      },
    ],
  },
  {
    title: '营销组件',
    components: [
      {
        type: 'text',
        title: '商品',
        icon: () => <FontSizeOutlined />,
        render: () => import('@components/Text/Index.js'),
      },
      {
        type: 'text',
        title: '回到顶部',
        icon: () => <FontSizeOutlined />,
        render: () => import('@components/Text/Index.js'),
      },
    ],
  },
];
