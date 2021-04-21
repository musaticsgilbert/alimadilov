/* eslint-disable no-restricted-globals */
import { useState, useEffect, useRef } from 'react'
import HTMLFlipBook from '../PageFlip/react-pageflip';
// import HTMLFlipBook from 'react-pageflip';
import './ImageBook.scss';
import { Page } from './Page/Page';
import Router from '../Router';

const ImageBook = () => {

  // const [language, setLanguage] = useState(0);
  const [language] = useState(0);
  // const [renderedPages, setRenderedPages] = useState([<Page type="cover" key="1"></Page>, <Page type="cover" key="2"></Page>, <Page type="cover" key="3"></Page>, <Page type="cover" key="4"></Page>, <Page type="cover" key="5"></Page>, <Page type="cover" key="6"></Page>,]);
  const [renderedPages, setRenderedPages] = useState([]);
  const [pageMap, setPageMap] = useState();
  const [pageData, setPageData] = useState({
    chapters: [],
    pageOfContents: 0,
    pages: []
  });
  // const [routingStrategy, setRoutingStrategy] = useState('hash');
  const [routingStrategy] = useState('hash')
  const [bookmark, setBookmark] = useState();
  const [page, setPage] = useState();
  // const [orientation, setOrientation] = useState('landscape');
  // const [orientation] = useState('landscape');
  // const [bookstate] = useState('read');
  // const [totalPage, setTotalPage] = useState(0);
  const [router, setRouter] = useState();
  const flipBook = useRef();

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/pages.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((res) => {
      res.json().then(pageArray => {
        // console.log(res);
        // console.log(window.innerWidth);
        // const isMobile = window.innerWidth < 1440;

        const pageData = preparePages(pageArray);

        pageData.pages[pageData.pageOfContents] = <Page type='contents' key={pageData.pageOfContents} pageNumber={pageData.pageOfContents} pageTitle={pageArray[pageData.pageOfContents].pagetitle[language]}>
          <ul className='contents'>
            {pageData.chapters.map((chapter, i) =>
              <li key={i}><a href={((routingStrategy === 'hash') ? '#/' : '') + String(chapter.pagenumber)} onClick={navigateToPage}>{chapter.pagetitle[language]}</a></li>
            )}
          </ul>
        </Page>;

        const initialNumOfRenderedPages = 3;
        const renderedPages = pageData.pages.slice(0, initialNumOfRenderedPages).concat(pageData.pages.slice(initialNumOfRenderedPages, pageData.pages.length).map(page => <Page type="temp" key={page.props.pageNumber} pageNumber={page.props.pageNumber}></Page>));


        const pageMap = new Array(initialNumOfRenderedPages).reduce((res, page, i) => {
          res[i] = true;
          return res;
        }, {});

        for (let i = 0; i < initialNumOfRenderedPages; i++) {
          pageMap[i] = true;
        }

        console.log('pageMap', pageMap);

        const router = new Router({ mode: routingStrategy });
        // console.log(router.getFragment());

        // const page = this.setupRoute();
        let page = 0;
        if (isNumeric(router.getFragment())) {
          page = Number(router.getFragment());
        } else {
          router.navigate('/0');
        }
        const bookmark = Number(localStorage.getItem('bookmark'));

        setRenderedPages(renderedPages);
        setPageData(pageData);
        setPageMap(pageMap);
        setRouter(router);
        setPage(page);
        setBookmark(bookmark);

      }, err => {
        alert('Nem sikerült betölteni az oldalt!');
        console.error(err);
      });
    }, err => {
      alert('Nem sikerült betölteni az oldalt.');
      console.error(err);
    });
    return () => {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if (tempCounter < 2) {
    //   setTempCounter(tempCounter => tempCounter + 1);
    //   return;
    // }
    const flipToPage = () => {
      // console.log('state', { language, renderedPages, pageData, routingStrategy, bookmark, page, router, flipBook });
      console.log('page', page);
      if (renderedPages.length >= page) {
        // flipBook.current.pageFlip().flip(Number(page));
        flipBook.current.flip(Number(page));

        if (router !== undefined) {
          router.navigate('/' + page);
        }
      } else {
        setPage(0);
      }
    };

    // lazy loading of pages
    const updateRenderedPages = () => {
      const updatedRenderedPages = [...renderedPages];
      const updatedPageMap = { ...pageMap };
      for (let i = page - 5; i < page + 5; i++) {
        if (i < 0 || i > renderedPages.length - 1) continue;
        if (pageMap[i] !== undefined) continue;

        updatedRenderedPages[i] = pageData.pages[i];
        updatedPageMap[i] = true;
      }

      setRenderedPages(() => updatedRenderedPages);
      setPageMap(() => updatedPageMap);
    }

    if (flipBook.current !== undefined && pageMap !== null && renderedPages.length >= page) {
      updateRenderedPages();
      // TODO: A weird race condition bug in very fast environments most of the time makes the initial flip referenced by the URL to be skipped and instead turns to page 1.
      // Since the useState setters cannot be subscribed here and I don't know React or more specifically Hooks that much, I will just put a bit of a timeout here to let the state changes happen before flipping.
      // Should fix after getting more experience about state updates.
      setTimeout(() => {
        flipToPage();
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (bookmark !== undefined) localStorage.setItem('bookmark', bookmark);
  }, [bookmark]);

  useEffect(() => {
    console.log('renderedPages-----', renderedPages);
  }, [renderedPages]);

  useEffect(() => {
    console.log('pageData', pageData);
  }, [pageData]);

  // Event handlers

  // const nextButtonClick = () => {
  //   setPage((totalPage > page) ? page + 1 : page);
  // }

  // const prevButtonClick = () => {
  //   setPage((0 < page) ? page - 1 : page);
  // }


  // const onPage = (e) => {
  //   setPage(e.data);
  // };

  const addPageToBookmark = () => {
    setBookmark(page);
  };

  const openBookmark = () => {
    setPage(bookmark);
  };

  // const updateBook = () => {
  //   // setRenderedPages([]);
  //   // setRenderedPages(pageData.pages.slice(0, 4));
  //   // setRenderedPages(renderedPages.slice(0, 4).concat(pageData.pages.slice(5, 7)));
  // }

  const preparePages = (pageArray) => {
    return pageArray.reduce((res, page, i) => {
      if (page.type === 'chapter') res.chapters.push({
        pagetitle: page.pagetitle,
        pagenumber: i
      });
      if (page.type === 'contents') {
        res.pageOfContents = i;
      }

      let inputProps = {
        key: i,
        pageNumber: i,
        type: page.type,
        pageTitle: (page.pagetitle) ? page.pagetitle[language] : undefined
      };
      if (i === 0) {
        inputProps.bookmark = true;
        inputProps.onBookmark = openBookmark;
        inputProps.pos = 'top';
      }
      if (i === pageArray.length - 1) {
        inputProps.pos = 'bottom';
      }
      if (page.imagename) {
        inputProps.image = process.env.PUBLIC_URL + '/' + page.imagename;
        inputProps.imageCaption = page.imagecaption[language]
      }
      if (page.type === 'html') {
        inputProps.content = page.content[language];
      }

      res.pages.push(
        <Page
          {...inputProps}
        ></Page>
      );
      return res;

    }, {
      chapters: [],
      pageOfContents: 0,
      pages: []
    });
  }


  // const createPage = (page, pagenumber, language) => {
  //   return <Page
  //     key={pagenumber}
  //     pageNumber={pagenumber}
  //     image={process.env.PUBLIC_URL + '/' + page.imagename}
  //     imageCaption={page.imagecaption[language]}
  //     // {(page.type === 'category') ? page.pagetitle[language] : null}
  //     pageTitle={(page.type === 'category') ? page.pagetitle[language] : undefined}
  //   ></Page>;
  // };

  const navigateToPage = (e) => {
    e.preventDefault();
    // setPage(Number(e.target.pathname.substring(1).split('/')[1]),);
    setPage(Number(e.target.hash.substring(1).split('/')[1]));
  }

  // https://stackoverflow.com/a/175787
  const isNumeric = (str) => {
    if (typeof str != 'string') return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  return (
    <div className='book-container container-md'>
      {/* <span>{this.state.isMobile}</span> */}
      <button type={'button'} className={'mt-1 btn btn-success'} onClick={addPageToBookmark} title={'Oldal könyvjelzőzése'}>
        <svg xmlns={'http://www.w3.org/2000/svg'} width={'16'} height={'16'} fill={'currentColor'} className={'bi bi-bookmark-plus'} viewBox={'0 0 16 16'}>
          <path fillRule={'evenodd'} d={'M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z'} />
          <path d={'M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z'} />
        </svg>
      </button>
      <button type={'button'} className={'mt-1 btn btn-danger'} onClick={openBookmark} title={'Oldal kinyitása a könyvjelzőhöz'}>
        <svg xmlns={'http://www.w3.org/2000/svg'} width={'16'} height={'16'} fill={'currentColor'} className={'bi bi-bookmark-plus'} viewBox={'0 0 16 16'}>
          <path fillRule={'evenodd'} d={'M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z'} />
          <path d={'M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z'} />
        </svg>
      </button>
      <span>{bookmark}</span>
      {(renderedPages.length > 0) ?
        <HTMLFlipBook
          width={550}
          height={733}
          size='stretch'
          minWidth={315}
          minHeight={400}
          maxWidth={1000}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          flippingTime={700}
          showCover={true}
          mobileScrollSupport={true}
          clickEventForward={['img', 'button', 'a']}
          drawShadow={true}
          swipeDistance={0}
          useMouseEvents={true}

          onFlip={(e) => setPage(() => {
            // console.log(e.data);
            return e.data;
          })}

          className='image-book'

          ref={flipBook}
        >
          {renderedPages}
        </HTMLFlipBook> : null}

      {/* <div className='pageturner-container'>
        <div>

          <button type='button' onClick={this.prevButtonClick}>Előző oldal</button>

            [<span>{this.state.page}</span> of <span> {this.state.totalPage} </span>]

            <button type='button' onClick={this.nextButtonClick}>Következő oldal</button>
        </div>
      </div> */}
    </div>
  );
}


export default ImageBook;