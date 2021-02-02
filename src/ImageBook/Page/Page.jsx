import React from 'react'

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className={"page page-cover page-cover-" + props.pos} ref={ref} data-density="hard" >
      <div className="page-content" >
        <h2>{props.children} </h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  var pageClass = 'page ' + (props.no_animation ? 'no-animation' : '');
  return (
    <div className={pageClass} ref={ref} data-density={props.density | "soft"}>
      <div className="page-content">
        <h2 className="page-header">{props.imageCaption}</h2>
        {/* {(props.image !== undefined) ?
          <div
            className="page-image"
            style={{ backgroundImage: "url(" + props.image + ")" }}
            onClick={showFullImage}
          ></div> : null
        } */}
        {(props.image !== undefined) ?
          <div className="page-image">
            <img
              alt={props.imageCaption}
              src={props.image}
              // style={{ backgroundImage: "url(" + props.image + ")", objectFit: 'contain' }}
              onClick={showFullImage}
              onLoad={setDimensions}
            ></img>
          </div>
          : null
        }
        {/* <figcaption>{props.imageCaption}</figcaption> */}
        {(props.children) ? <div className="page-text">{props.children}</div> : null}
        <div className="page-footer">{isNaN(props.number) ? '' : props.number}</div>
      </div>
    </div>
  );

  function setDimensions(e) {
    e.target.style = (e.target.width > e.target.height) ? 'width: 100%' : 'height: 100%';
    console.log(e);
  }

  function showFullImage(e) {
    console.log('props', props);
    console.log('ref', ref);
    e.target.requestFullscreen().then(() => {

    });
  }
});

export { PageCover, Page };