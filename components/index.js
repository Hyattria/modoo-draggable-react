import Text from './Text/Index';
import Image from './Image/Index';
import PlaceHolder from './Placeholder/Index';

// 初始组件配置
const renderMapJSON = {};

/**
 * 注册组件
 * @param {*} key
 * @param {*} obj
 */
function registerComponent(key, obj) {
  renderMapJSON[key] = {
    type: key,
    title: obj.title,
    render: obj.render || obj, // 组件
    configs: obj.getPropsConfig,
    propsValue:
      obj.getPropsConfig &&
      obj.getPropsConfig.reduce((result, now) => {
        result[now['name']] = now.detail.defaultValue || '';
        return result;
      }, {}), // 传入的 props
  };
}

registerComponent('title_text', Text);
registerComponent('image', Image);
registerComponent('placeholder', PlaceHolder);

export function getConfigByType(type) {
  return renderMapJSON[type];
}

// type 对应组件
export const renderComponentType = {
  title_text: Text,
};
