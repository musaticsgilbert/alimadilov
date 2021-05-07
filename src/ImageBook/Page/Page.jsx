import React from 'react'
import './Page.scss';

const Page = React.forwardRef((props, ref) => {
  switch (props.type) {
    case 'temp':
      return <div className='page' ref={ref} data-density='soft'>
        <div className="page-content">
          &nbsp;
          <div className='page-footer'>{isNaN(props.pageNumber) ? '' : props.pageNumber}</div>
        </div>
      </div>;
    case 'cover':
      return (
        <div
          className={'page page-cover page-cover-' + props.pos}
          ref={ref}
          data-density='soft'
        >
          {/* {(props.bookmark === true) ?
            <img
              className='bookmark'
              src={process.env.PUBLIC_URL + '/bookmark.png'}
              style={{ filter: 'invert(10%) sepia(96%) saturate(6344%) hue-rotate(1deg) brightness(121%) contrast(113%)' }}
              alt="könyvjelző"
              title='Kinyitás a könyvjelzőnél'
              onClick={() => props.onBookmark()}
            />
            : null
          } */}
          <div className='page-content'>
            <h2>{props.pageTitle}</h2>
          </div>
        </div>
      );

    case 'html':
      return <div className={'page ' + (props.no_animation ? 'no-animation' : '')} ref={ref} data-density='soft'>
        <div className="page-content">
          {(props.pageTitle !== undefined) ?
            <h2 className='page-header'>{props.pageTitle}</h2> : null
          }
          <div className="page-text">
            {(props.content.image !== null && props.content.image !== '') ?
              <img style={{ margin: '1%', float: 'left' }} src={process.env.PUBLIC_URL + '/' + props.content.image} width='40%' alt=""></img> : null
            }
            <div dangerouslySetInnerHTML={{ __html: props.content.html.outerHTML }}></div>
          </div>
          <div className='page-footer'>{isNaN(props.pageNumber) ? '' : props.pageNumber}</div>
        </div>
      </div>;

    case 'contents':
    case 'chapter':
    case 'image':
      return (
        <div className={'page ' + (props.no_animation ? 'no-animation' : '')} ref={ref} data-density='soft'>
          <div className='page-content'>
            <div>
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
            </div>
            {(props.children) ? <div className='page-text'>{props.children}</div> : null}
            <div className='page-footer'>{isNaN(props.pageNumber) ? '' : props.pageNumber}</div>
          </div>
        </div >
      );

    default:
      throw new Error('unrecognizable or missing page type');
  }


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

export { Page };