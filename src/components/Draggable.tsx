import React, {
  isValidElement,
  ReactChild,
  useEffect,
  useRef,
  useState,
} from "react";
import { DraggableAsset } from "../models/draggable-asset";

interface Props {
  children: ReactChild;
}

const Draggable: React.FC<Props> = ({ children }) => {
  const [draggableAsset, setDraggableAssetll] = useState<DraggableAsset>({
    initialX: 0,
    initialY: 0,
    currentX: 0,
    currentY: 0,
    offsetX: 0,
    offsetY: 0,
    isBoxDragging: false,
  });

  const draggableRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const dragStart = (event: MouseEvent) => {
    if (event.target === boxRef.current) {
      setDraggableAssetll((_draggableAsset: DraggableAsset) => {
        return {
          ..._draggableAsset,
          initialX: event.clientX,
          initialY: event.clientY,
          isBoxDragging: true,
        };
      });
    }
  };

  const dragEnd = () => {
    if (draggableAsset.isBoxDragging) {
      setDraggableAssetll((_draggableAsset: DraggableAsset) => {
        return {
          ..._draggableAsset,
          initialX: 0,
          initialY: 0,
          offsetX: _draggableAsset.currentX,
          offsetY: _draggableAsset.currentY,
          isBoxDragging: false,
        };
      });
    }
  };

  const drag = (event: MouseEvent) => {
    if (draggableAsset.isBoxDragging) {
      event.preventDefault();

      setDraggableAssetll((_draggableAsset: DraggableAsset) => {
        return {
          ..._draggableAsset,
          currentX:
            event.clientX - _draggableAsset.initialX + _draggableAsset.offsetX,
          currentY:
            event.clientY - _draggableAsset.initialY + _draggableAsset.offsetY,
        };
      });
    }
  };

  useEffect(() => {
    if (boxRef.current != null) {
      boxRef.current.style.transform = `translate(${draggableAsset.currentX}px, ${draggableAsset.currentY}px)`;
    }
  }, [draggableAsset.currentX, draggableAsset.currentY]);

  useEffect(() => {
    draggableRef?.current?.addEventListener("mousedown", dragStart);

    return () => {
      draggableRef?.current?.removeEventListener("mousedown", dragStart);
    };
  }, [draggableRef.current]);

  useEffect(() => {
    if (draggableAsset.isBoxDragging) {
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
  }, [draggableRef.current, draggableAsset.isBoxDragging]);

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
