import React, { useState } from 'react';

type Props = {
  children: JSX.Element[];
};

const rowHeight = 40;

export const Window: React.FC<Props> = (props) => {
  const { children } = props;

  const [isVirtualize, setIsVirtualize] = useState(false);

  const [scrollPos, setScrollPos] = useState(0);

  const renderChildren = () => {
    return children.map((child, idx) => (
      <div
        style={{
          position: 'absolute',
          height: rowHeight,
          width: '100%',
          border: '1px solid lightblue',
          top: idx * rowHeight,
        }}
      >
        {child}
      </div>
    ));
  };

  const renderVisibleChild = () => {
    const startIdx = Math.floor(scrollPos / rowHeight);

    const endIdx = Math.ceil(startIdx + 15);

    return children.slice(startIdx, endIdx).map((child, idx) => (
      <div
        style={{
          position: 'absolute',
          height: rowHeight,
          width: '100%',
          border: '1px solid lightblue',
          top: idx * rowHeight + Math.floor(scrollPos / rowHeight) * rowHeight,
        }}
      >
        {child}
      </div>
    ));
  };

  return (
    <>
      <button
        onClick={() => {
          setIsVirtualize((prev) => !prev);
          setScrollPos(0);
        }}
      >
        is virtualize: {isVirtualize ? 'true' : 'false'}
      </button>
      {isVirtualize ? (
        <div
          onScroll={(e) => setScrollPos(e.currentTarget.scrollTop)}
          style={{
            position: 'relative',
            width: 300,
            height: 400,
            border: '1px solid red',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          <div style={{ height: children.length * rowHeight }}>
            {renderVisibleChild()}
          </div>
        </div>
      ) : (
        <div
          onScroll={(e) => setScrollPos(e.currentTarget.scrollTop)}
          style={{
            position: 'relative',
            width: 300,
            height: 400,
            border: '1px solid red',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          <div style={{ height: children.length * rowHeight }}>
            {renderChildren()}
          </div>
        </div>
      )}
    </>
  );
};
