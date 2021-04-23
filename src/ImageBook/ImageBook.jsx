/* eslint-disable no-restricted-globals */
import { useState, useEffect, useRef } from 'react'
import HTMLFlipBook from '../PageFlip/react-pageflip';
// import HTMLFlipBook from 'react-pageflip';
import './ImageBook.scss';
import { Page } from './Page/Page';
import Router from '../Router';

const ImageBook = () => {
  const [language, setLanguage] = useState(0);
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

        const _pageData = preparePages(pageArray);

        _pageData.pages[_pageData.pageOfContents - 1] = <Page
          type='contents'
          key={_pageData.pageOfContents - 1}
          pageNumber={_pageData.pageOfContents - 1}
          pageTitle={_pageData.pages[_pageData.pageOfContents - 1].props.pageTitle}
        >
          <ul className='contents'>
            {_pageData.chapters.map((chapter, i) =>
              <li key={i}><a href={((routingStrategy === 'hash') ? '#/' : '') + String(chapter.pagenumber)} onClick={navigateToPage}>{chapter.pagetitle[language]}</a></li>
            )}
          </ul>
        </Page>;

        const initialNumOfRenderedPages = 3;
        const _renderedPages = _pageData.pages.slice(0, initialNumOfRenderedPages).concat(_pageData.pages.slice(initialNumOfRenderedPages, _pageData.pages.length).map(page => <Page type="temp" key={page.props.pageNumber} pageNumber={page.props.pageNumber}></Page>));


        const _pageMap = new Array(initialNumOfRenderedPages).reduce((res, page, i) => {
          res[i] = true;
          return res;
        }, {});

        for (let i = 0; i < initialNumOfRenderedPages; i++) {
          _pageMap[i] = true;
        }

        console.log('pageMap', _pageMap);

        const _router = new Router({ mode: routingStrategy });
        // console.log(router.getFragment());

        // const page = this.setupRoute();
        let _page = 0;
        if (isNumeric(_router.getFragment())) {
          _page = Number(_router.getFragment());
        } else {
          _router.navigate('/0');
        }
        const _bookmark = Number(localStorage.getItem('bookmark'));

        let update = updateRenderedPages(_renderedPages, _pageMap, _pageData);
        setRenderedPages(() => update.updatedRenderedPages);
        setPageMap(() => update.updatedPageMap);

        // setRenderedPages(_renderedPages);
        // setPageMap(_pageMap);
        setPageData(_pageData);
        setRouter(_router);
        setPage(_page);
        setBookmark(_bookmark);

        // updateRenderedPages();
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
  }, [language]);

  useEffect(() => {
    // if (tempCounter < 2) {
    //   setTempCounter(tempCounter => tempCounter + 1);
    //   return;
    // }
    const flipToPage = () => {
      // console.log('state', { language, renderedPages, pageData, routingStrategy, bookmark, page, router, flipBook });
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

    if (flipBook.current !== undefined && pageMap !== null && renderedPages.length >= page) {
      let update = updateRenderedPages(renderedPages, pageMap, pageData);
      setRenderedPages(() => update.updatedRenderedPages);
      setPageMap(() => update.updatedPageMap);
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
    console.log('renderedPages', renderedPages);
  }, [renderedPages]);

  useEffect(() => {
    console.log('pageData', pageData);
  }, [pageData]);

  // lazy loading of pages
  const updateRenderedPages = (_renderedPages, _pageMap, _pageData) => {
    const updatedRenderedPages = [..._renderedPages];
    const updatedPageMap = { ..._pageMap };
    for (let i = page - 5; i < page + 5; i++) {
      if (i < 0 || i > _renderedPages.length - 1) continue;
      if (_pageMap[i] !== undefined) continue;

      updatedRenderedPages[i] = _pageData.pages[i];
      updatedPageMap[i] = true;
    }

    return { updatedRenderedPages, updatedPageMap };
  }

  useEffect(() => {
    console.log('Change');
  });

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
    return pageArray.reduce((res, page, index) => {
      if (page.type === 'chapter') res.chapters.push({
        pagetitle: page.pagetitle,
        pagenumber: res.pageCount
      });
      if (page.type === 'contents') {
        // We want to have the links on the right side
        if (res.pageCount % 2 === 1) {
          res.pages.push(<Page type="temp" key={res.pageCount} pageNumber={res.pageCount}></Page>);
          res.pageCount += 1;
        }
        res.pageOfContents = res.pageCount + 1;
      }
      if (index + 1 === pageArray.length) {
        if (res.pageCount % 2 === 0) {
          res.pages.push(<Page type="temp" key={res.pageCount} pageNumber={res.pageCount}></Page>);
          res.pageCount += 1;
        }
      }

      if (page.type === 'html') {
        // On a 480x720 display the text content would probably have these width-height parameters
        const htmlpages = cutHTMLIntoPieces(page.content[language].html, 420, 500);
        let minipages = htmlpages.map((p, i) => {
          return <Page
            key={res.pageCount + i}
            pageNumber={res.pageCount + i}
            type={page.type}
            pageTitle={page.pagetitle[language]}
            content={(i === 0) ? { image: page.content[language].image, html: p } : { image: null, html: p }}
          ></Page>
        });
        minipages.forEach(p => res.pages.push(p));
        res.pageCount += htmlpages.length;

      } else {
        let inputProps = {
          key: res.pageCount,
          pageNumber: res.pageCount,
          type: page.type,
          pageTitle: (page.pagetitle) ? page.pagetitle[language] : undefined
        };
        if (res.pageCount === 0) {
          inputProps.bookmark = true;
          inputProps.onBookmark = openBookmark;
          inputProps.pos = 'top';
        }
        if (res.pageCount === pageArray.length - 1) {
          inputProps.pos = 'bottom';
        }
        if (page.imagename) {
          inputProps.image = process.env.PUBLIC_URL + '/' + page.imagename;
          inputProps.imageCaption = page.imagecaption[language]
        }

        res.pages.push(
          <Page
            {...inputProps}
          ></Page>
        );
        res.pageCount += 1;
      }

      return res;

    }, {
      chapters: [],
      pageCount: 0,
      pageOfContents: 0,
      pages: []
    });
  }

  const cutHTMLIntoPieces = (content, width, height) => {
    let hiddendiv = document.createElement('div');
    hiddendiv.id = 'hiddendiv';
    hiddendiv.style.width = width + 'px';
    hiddendiv.style.visibility = 'hidden';
    hiddendiv.style.fontSize = '120%';
    hiddendiv.innerHTML = content;
    let arr = [];

    document.body.appendChild(hiddendiv);

    hiddendiv.childNodes.forEach(node => {
      if (node.nodeType === 3) {
        arr.push(node.textContent);
      } else {
        arr.push(node.outerHTML);
      }
    });
    hiddendiv.innerHTML = '';

    let pages = [];
    let pageIndex = 0;

    pages[0] = document.createElement('article');

    for (let i = 0; i < arr.length; i++) {
      hiddendiv.innerHTML += arr[i];
      if (hiddendiv.clientHeight > height) {
        pageIndex += 1;
        pages[pageIndex] = document.createElement('article');
        hiddendiv.innerHTML = '';
      }
      pages[pageIndex].innerHTML += arr[i];
    }

    document.body.removeChild(hiddendiv);
    return pages;
  }

  const changeLanguage = () => {
    setLanguage(language => (language === 1) ? 0 : 1);
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
      <button onClick={changeLanguage}>Click</button>
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