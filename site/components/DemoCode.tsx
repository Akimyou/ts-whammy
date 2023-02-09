import React, { useState } from "react";

export const DemoCode = (props: {
  children?: React.ReactNode;
  code?: React.ReactNode;
  codeRaw?: string;
}) => {
  const [showCode, setShowCode] = useState<boolean>(false);
  const [showCopySuccess, setShowCopySuccess] = useState<boolean>(false);
  return (
    <div>
      {props.children}
      <p>
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            setShowCode(!showCode);
          }}
        >
          {showCode ? "Hide Code" : "View Code"}
        </a>
        <a
          href="#"
          onClick={async (event) => {
            event.preventDefault();
            try {
              await navigator.clipboard.writeText(props.codeRaw || "");
              setShowCopySuccess(true);
              setTimeout(() => {
                setShowCopySuccess(false);
              }, 2000);
            } catch (error) {
              console.error(error);
            }
          }}
          style={{ marginLeft: 8 }}
        >
          {showCopySuccess ? "Copy Success" : "Copy Code"}
        </a>
      </p>
      {showCode && <div>{props.code}</div>}
    </div>
  );
};
