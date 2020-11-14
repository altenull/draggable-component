import { useCallback, useEffect, useRef, useState } from "react";
import { DraggableAsset } from "../models/draggable-asset";

export const useDragging = (): [React.RefObject<HTMLDivElement>, React.RefObject<HTMLDivElement>, boolean] => {
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

  const dragStart = useCallback((event: MouseEvent) => {
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
  }, []);

  const dragEnd = useCallback(() => {
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
  }, [draggableAsset.isBoxDragging]);

  const drag = useCallback((event: MouseEvent) => {
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
  }, [draggableAsset.isBoxDragging]);

  useEffect(() => {
    if (boxRef.current != null) {
      boxRef.current.style.transform = `translate(${draggableAsset.currentX}px, ${draggableAsset.currentY}px)`;
    }
  }, [draggableAsset.currentX, draggableAsset.currentY]);

  useEffect(() => {
    const draggableElement: HTMLDivElement | null = draggableRef.current;

    draggableElement?.addEventListener("mousedown", dragStart);

    return () => {
      draggableElement?.removeEventListener("mousedown", dragStart);
    };
  }, [draggableRef, dragStart]);

  useEffect(() => {
    const draggableElement: HTMLDivElement | null = draggableRef.current;

    if (draggableAsset.isBoxDragging) {
      draggableElement?.addEventListener("mouseup", dragEnd);
      draggableElement?.addEventListener("mousemove", drag);
    } else {
      draggableElement?.removeEventListener("mouseup", dragEnd);
      draggableElement?.removeEventListener("mousemove", drag);
    }

    return () => {
      draggableElement?.removeEventListener("mouseup", dragEnd);
      draggableElement?.removeEventListener("mousemove", drag);
    };
  }, [draggableRef, draggableAsset.isBoxDragging, drag, dragEnd]);

  return [draggableRef, boxRef, draggableAsset.isBoxDragging]
}