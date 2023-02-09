import React, { useState } from "react";

export const DemoCode = (props: {
  children?: React.ReactNode;
  code?: React.ReactNode;
}) => {
  const [showCode, setShowCode] = useState<boolean>(false);
  return (
    <div>
      {props.children}
      <p>
        <a href="#" onClick={() => setShowCode(!showCode)}>
          {showCode ? "Hide Code" : "View Code"}
        </a>
      </p>
      {showCode && <div>{props.code}</div>}
    </div>
  );
};
