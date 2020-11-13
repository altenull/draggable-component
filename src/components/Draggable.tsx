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

interface BoxPosition {
  x: number | null;
  y: number | null;
}

const Draggable: React.FC<Props> = ({ children }) => {
  const [isBoxDragging, setIsBoxDragging] = useState<boolean>(false);
  const [draggableDOMRect, setDraggableDOMRect] = useState<DOMRect>();
  const [boxDOMRect, setBoxDOMRect] = useState<DOMRect>();
  const [boxPosition, setBoxPosition] = useState<BoxPosition>({
    x: null,
    y: null,
  });

  const draggableRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (draggableRef.current != null) {
      setDraggableDOMRect(draggableRef.current.getBoundingClientRect());
    }
  }, [draggableRef.current]);

  useEffect(() => {
    if (boxRef.current != null) {
      setBoxDOMRect(boxRef.current.getBoundingClientRect());
    }
  }, [boxRef.current]);

  // set initial box position.
  useEffect(() => {
    if (draggableDOMRect != null && boxDOMRect != null) {
      setBoxPosition({
        x: boxDOMRect.x - draggableDOMRect.x + boxDOMRect.width / 2,
        y: boxDOMRect.y - draggableDOMRect.y + boxDOMRect.height / 2,
      });
    }
  }, [draggableDOMRect, boxDOMRect]);

  const dragStart = (event: MouseEvent) => {
    if (event.target === boxRef.current) {
      setIsBoxDragging(true);
    }
  };

  const dragEnd = (event: MouseEvent) => {
    if (isBoxDragging) {
      setIsBoxDragging(false);
    }
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
