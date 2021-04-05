import React from 'react'
import './Page.scss';

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div
      className={'page page-cover page-cover-' + props.pos}
      // style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/logo512.png')` }}
      // style={{ height: '1000px', backgroundImage: "url()" }}
      ref={ref}
      data-density='hard'
    >
      {(props.bookmark === true) ?
        <img
          className='bookmark'
          src={process.env.PUBLIC_URL + '/bookmark.png'}
          style={{ filter: 'invert(10%) sepia(96%) saturate(6344%) hue-rotate(1deg) brightness(121%) contrast(113%)' }}
          alt="könyvjelző"
          title='Kinyitás a könyvjelzőnél'
          onClick={props.onBookmark}
        />
        : null
      }
      <div className='page-content'>
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  var pageClass = 'page ' + (props.no_animation ? 'no-animation' : '');
  return (
    <div className={pageClass} ref={ref} data-density={props.density | 'soft'}>
      <div className='page-content'>
        {(props.pageTitle !== undefined) ?
          <h2 className='page-header'>{props.pageTitle}</h2> : null
        }
        {(props.image !== undefined) ?
          <div className='page-image'>
            <figure>
              <img
                alt={props.imageCaption}
                src={props.image}
                onClick={showFullImage}
                onLoad={setDimensions}
              ></img>
              <figcaption>{props.imageCaption}</figcaption>
            </figure>
          </div>
          : null
        }
        {(props.children) ? <div className='page-text'>{props.children}</div> : null}
        <div className='page-footer'>{isNaN(props.pageNumber) ? '' : props.pageNumber}</div>
      </div>
    </div>
  );

  function setDimensions(e) {
    e.target.style = (e.target.width > e.target.height) ? 'width: 100%' : 'height: 100%';
  }

  function showFullImage(e) {
    console.log('props', props);
    console.log('ref', ref);
    e.target.requestFullscreen().then(() => {

    });
  }
});

export { PageCover, Page };