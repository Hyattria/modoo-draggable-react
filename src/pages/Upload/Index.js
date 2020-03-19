import React, { useState } from 'react';
import { Button } from 'antd';
import { fetch } from 'dva';

const API = 'http://localhost:4000';

const UpLoad = () => {
  const [file, setFile] = useState(undefined);
  const SIZE = 10 * 1024; // 切片大小

  const handleFileChange = e => {
    const [file] = e.target.files;
    if (!file) return;
    setFile(file);
  };

  // 创建切片
  const createFileChunk = (file, size = SIZE) => {
    const fileList = [];
    let current = 0;
    while (current < file.size) {
      fileList.push({ file: file.slice(current, current + size) });
      current += size;
    }
    return fileList;
  };

  const uploadChunks = async data => {
    const requestList = data
      .map(({ chunk, hash }) => {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('hash', hash);
        formData.append('filename', file.name);
        return { formData };
      })
      .map(async ({ formData }) => {
        fetch(`${API}/page/upload`, {
          method: 'post',
          body: formData,
        });
      });
    await Promise.all(requestList); // 并发切片
    await mergeRequest();
  };

  // 告诉服务器合并切片
  const mergeRequest = async () => {
    await fetch(`${API}/page/merge`, {
      method: 'post',
      body: JSON.stringify({
        filename: file.name,
        size: SIZE,
      }),
    });
  };

  const handleUpload = () => {
    if (!file) return;
    const fileChunkList = createFileChunk(file);

    const data = fileChunkList.map((item, index) => {
      return {
        chunk: item.file,
        hash: file.name + '-' + index,
      };
    });
    uploadChunks(data);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <img />
      <Button onClick={handleUpload}>上传</Button>
    </div>
  );
};

export default UpLoad;
