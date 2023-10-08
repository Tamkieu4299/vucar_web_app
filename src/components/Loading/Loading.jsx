import { Spin } from "antd";

function Loading() {
  return (
    <div className="text-center absolute top-1/2 left-1/2">
      <Spin tip="Loading" size="large" />
    </div>
  );
}

export default Loading;
