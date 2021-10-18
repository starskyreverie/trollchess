import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

const Piece = (props) => {
  const choiceOfColor = props.isWhite ? 0 : 1;
  const [image] = useImage(props.imgurls[choiceOfColor]);
  const isDragged = props.id === props.draggedPieceTargetId;

  const canThisPieceEvenBeMovedByThisPlayer =
    props.isWhite === props.thisPlayersColorIsWhite;
  const isItThatPlayersTurn =
    props.playerTurnToMoveIsWhite === props.thisPlayersColorIsWhite;

  const thisWhiteKingInCheck = props.id === "wk1" && props.whiteKingInCheck;
  const thisBlackKingInCheck = props.id === "bk1" && props.blackKingInCheck;

  const isHighlighted = props.id.startsWith(
    props.playerTurnToMoveIsWhite ? "w" + props.brain : "b" + props.brain
  );

  // console.log("this piece ID:" + props.thisPieceTargetId)
  // console.log("dragged piece ID:" + props.draggedPieceTargetId)
  return (
    <Image
      image={image}
      x={props.x - 97.5}
      y={props.y - 97.5}
      draggable={canThisPieceEvenBeMovedByThisPlayer && isItThatPlayersTurn}
      width={isDragged ? 90 : 75}
      height={isDragged ? 90 : 75}
      onDragStart={props.onDragStart}
      onDragEnd={props.onDragEnd}
      fill={
        (thisWhiteKingInCheck && "#ff9898") ||
        (thisBlackKingInCheck && "#ff9898") ||
        (isHighlighted && canThisPieceEvenBeMovedByThisPlayer && "#acffcb")
      }
      id={props.id}
    />
  );
};

export default Piece;
