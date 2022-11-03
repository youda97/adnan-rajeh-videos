import React from "react";
interface Props {}

export const VideoModal = ({}: Props) => {
    return (
        <></>
        // <div className="modal-wrapper" onClick={() => modalClose()}>
        //     <div
        //         className="modal"
        //         onClick={(e) => e.stopPropagation()}
        //         ref={videoModal}
        //     >
        //         {isVideoOpen && !videos.loading && videos.items && (
        //             <div className="video-container">
        //                 <div className="iframe-container">
        //                     <iframe
        //                         className="video"
        //                         height="520"
        //                         src={
        //                             "https://www.youtube.com/embed/" +
        //                             videos.items[0].id +
        //                             "?autoplay=1&mute=0&rel=0&modestbranding=1"
        //                         }
        //                         title={videos.items[0].title}
        //                         frameBorder="0"
        //                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //                         allowFullScreen
        //                     ></iframe>
        //                 </div>
        //                 <div className="video-info__container">
        //                     <div className="video-info">
        //                         <div
        //                             className="close-button"
        //                             onClick={() => modalClose()}
        //                         >
        //                             <X />
        //                         </div>
        //                         <div className="video-info--left">
        //                             <div className="metadata">
        //                                 <Eye size="14" />
        //                                 <div className="statistics">
        //                                     {videos.items[0].viewCount}
        //                                 </div>
        //                                 <ThumbsUp size="14" />
        //                                 <div className="statistics">
        //                                     {videos.items[0].likeCount}
        //                                 </div>
        //                                 <div className="duration">
        //                                     {formatDuration(
        //                                         videos.items[0].duration
        //                                     )}
        //                                 </div>
        //                             </div>
        //                             <div className="title">
        //                                 {videos.items[0].title}
        //                             </div>
        //                             <div className="description">
        //                                 {videos.items[0].description}
        //                             </div>
        //                         </div>

        //                         <div className="video-info--right">
        //                             {videos.items[0].tags && (
        //                                 <>
        //                                     <span className="tag-label">
        //                                         Tags:
        //                                     </span>
        //                                     <div className="tags">
        //                                         {videos.items[0].tags.map(
        //                                             (tag: any, index: any) => {
        //                                                 return (
        //                                                     tag +
        //                                                     (index ===
        //                                                     videos.items[0].tags
        //                                                         .length -
        //                                                         1
        //                                                         ? ""
        //                                                         : ", ")
        //                                                 );
        //                                             }
        //                                         )}
        //                                     </div>
        //                                 </>
        //                             )}
        //                         </div>
        //                     </div>

        //                     <div className="divider"></div>

        //                     <div className="prevnext">
        //                         {videoPrev && Object.keys(videoPrev).length && (
        //                             <div className="prevnext-item">
        //                                 <span>Previous Video:</span>
        //                                 <a
        //                                     className="prevnext-video"
        //                                     href={void 0}
        //                                     onClick={() =>
        //                                         loadPrevNextVideo(videoPrev)
        //                                     }
        //                                 >
        //                                     <img
        //                                         src={
        //                                             videoPrev.thumbnails &&
        //                                             videoPrev.thumbnails.high
        //                                                 ? videoPrev.thumbnails
        //                                                       .high.url
        //                                                 : videoPrev.thumbnails
        //                                                       .medium
        //                                                 ? videoPrev.thumbnails
        //                                                       .medium.url
        //                                                 : videoPrev.thumbnails
        //                                                       .default.url
        //                                         }
        //                                     />
        //                                     <div className="play-icon">
        //                                         <PlayCircle size="40" />
        //                                     </div>
        //                                 </a>
        //                             </div>
        //                         )}

        //                         {videoNext && Object.keys(videoNext).length && (
        //                             <div className="prevnext-item">
        //                                 <span>Next Video:</span>
        //                                 <a
        //                                     className="prevnext-video"
        //                                     href={void 0}
        //                                     onClick={() =>
        //                                         loadPrevNextVideo(videoNext)
        //                                     }
        //                                 >
        //                                     <img
        //                                         src={
        //                                             videoNext.thumbnails &&
        //                                             videoNext.thumbnails.high
        //                                                 ? videoNext.thumbnails
        //                                                       .high.url
        //                                                 : videoNext.thumbnails
        //                                                       .medium
        //                                                 ? videoNext.thumbnails
        //                                                       .medium.url
        //                                                 : videoNext.thumbnails
        //                                                       .default.url
        //                                         }
        //                                     />
        //                                     <div className="play-icon">
        //                                         <PlayCircle size="40" />
        //                                     </div>
        //                                 </a>
        //                             </div>
        //                         )}
        //                     </div>
        //                 </div>
        //             </div>
        //         )}
        //     </div>
        //     <div className="modal-overlay" tabIndex={-1}></div>
        // </div>
    );
};
