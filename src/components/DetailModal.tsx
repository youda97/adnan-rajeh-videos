import React from "react";
interface Props {
    item: any;
}

export const DetiailModal = ({ item }: Props) => {
    return (
        <></>
        // <a
        //     ref={largeInfoDisplay}
        //     href={void 0}
        //     onClick={(e) => onVideoClick(e, hoveredItem.item, 0, 0)}
        //     style={{
        //         top: hoveredItem.positionTop + "px",
        //         left: hoveredItem.positionLeft + "px",
        //         width: hoveredItem.width + "px",
        //         // transform:
        //         //     hoveredItem.j === 0
        //         //         ? "transform: translateX(51px) translateY(0px) scaleX(1) scaleY(1) translateZ(0px)"
        //         //         : hoveredItem.j + 1 === itemsPerRow
        //         //         ? "translateX(-51px) translateY(0px) scaleX(1) scaleY(1) translateZ(0px)"
        //         //         :  "none",
        //     }}
        //     className={
        //         "playlist-video--large" +
        //         (isHovered
        //             ? " playlist-video--large-open"
        //             : " playlist-video--large-closed")
        //     }
        //     onMouseLeave={onLargeImageLeave}
        // >
        //     <img
        //         key={hoveredItem.item.id}
        //         src={
        //             hoveredItem.item.thumbnails &&
        //             hoveredItem.item.thumbnails.high
        //                 ? hoveredItem.item.thumbnails.high.url
        //                 : hoveredItem.item.thumbnails.medium
        //                 ? hoveredItem.item.thumbnails.medium.url
        //                 : hoveredItem.item.thumbnails.default.url
        //         }
        //     />
        //     <div className="playlist-video__info">
        //         {videos.items.length && (
        //             <>
        //                 <div className="title">{videos.items[0].title}</div>
        //                 <div className="metadata">
        //                     <Eye size="14" />
        //                     <div className="statistics">
        //                         {videos.items[0].viewCount}
        //                     </div>
        //                     <ThumbsUp size="14" />
        //                     <div className="statistics">
        //                         {videos.items[0].likeCount}
        //                     </div>
        //                     <div className="duration">
        //                         {formatDuration(videos.items[0].duration)}
        //                     </div>
        //                 </div>
        //             </>
        //         )}
        //     </div>
        // </a>
    );
};
