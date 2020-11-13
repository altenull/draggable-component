import React, {
  isValidElement,
  ReactChild,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  children: ReactChild;
}

const Draggable: React.FC<Props> = ({ children }) => {
  const [isBoxDragging, setIsBoxDragging] = useState<boolean>(false);

  const draggableRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const dragStart = (event: MouseEvent) => {
    if (event.target === boxRef.current) {
      setIsBoxDragging(true);
    }
  };

  const dragEnd = (event: MouseEvent) => {
    setIsBoxDragging(false);
  };

  const drag = (event: MouseEvent) => {};

  useEffect(() => {
    draggableRef?.current?.addEventListener("mousedown", dragStart);

    return () => {
      draggableRef?.current?.removeEventListener("mousedown", dragStart);
    };
  }, [draggableRef.current]);

  useEffect(() => {
    if (isBoxDragging) {
      draggableRef?.current?.addEventListener("mouseup", dragEnd);
      draggableRef?.current?.addEventListener("mousemove", drag);
    } else {
      draggableRef?.current?.removeEventListener("mouseup", dragEnd);
      draggableRef?.current?.removeEventListener("mousemove", drag);
    }

    return () => {
      draggableRef?.current?.removeEventListener("mouseup", dragEnd);
      draggableRef?.current?.removeEventListener("mousemove", drag);
    };
  }, [draggableRef.current, isBoxDragging]);

  const draggableStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "90vw",
    height: "90vh",
    margin: "auto",
    backgroundColor: "#ced4da",
  };

  return (
    <div style={draggableStyle} ref={draggableRef}>
      {React.Children.map(children, (child) => {
        if (isValidElement(child)) {
          return React.cloneElement(child, {
            ref: boxRef,
          });
        }
      })}
    </div>
  );
};

export default Draggable;
