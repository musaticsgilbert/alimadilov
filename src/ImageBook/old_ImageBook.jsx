/* eslint-disable no-restricted-globals */
import React from 'react'
import HTMLFlipBook from '../PageFlip/react-pageflip';
import './ImageBook.scss';
import { Page } from './Page/Page';
import Router from '../Router';

class ImageBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: 0,
      // pageOffset,
      // mainPageData,
      // renderedPages: [<Page type="cover" key="1"></Page>, <Page type="cover" key="2"></Page>, <Page type="cover" key="3"></Page>, <Page type="cover" key="4"></Page>, <Page type="cover" key="5"></Page>, <Page type="cover" key="6"></Page>,],
      renderedPages: [],
      pageData: {
        chapters: [],
        pageOfContents: 0,
        pages: []
      },
      routingStrategy: 'hash',
      bookmark: null,
      page: 0,
      orientation: 'landscape',
      state: 'read',
      // totalPage: 0,
      router: null,
    };
  }

  // Lifecycle management
  componentDidMount() {

    fetch(process.env.PUBLIC_URL + '/pages.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => {
      res.json().then(pageArray => {
        // console.log(res);
        // console.log(window.innerWidth);
        // const isMobile = window.innerWidth < 1440;

        const pageData = pageArray.reduce((res, page, i) => {
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
            pageTitle: (page.pagetitle) ? page.pagetitle[this.state.language] : undefined
          };
          if (i === 0) {
            inputProps.bookmark = true;
            inputProps.onBookmark = this.openBookmark;
            inputProps.pos = 'top';
          }
          if (i === pageArray.length - 1) {
            inputProps.pos = 'bottom';
          }
          if (page.imagename) {
            inputProps.image = process.env.PUBLIC_URL + '/' + page.imagename;
            inputProps.imageCaption = page.imagecaption[this.state.language]
          }
          if (page.type === 'html') {
            inputProps.content = page.content[this.state.language];
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

        pageData.pages[pageData.pageOfContents] = <Page type='contents' key={pageData.pageOfContents} pageNumber={pageData.pageOfContents} pageTitle={pageArray[pageData.pageOfContents].pagetitle[this.state.language]}>
          <ul className='contents'>
            {pageData.chapters.map((chapter, i) =>
              <li key={i}><a href={((this.state.routingStrategy === 'hash') ? '#/' : '') + String(chapter.pagenumber)} onClick={this.navigateToPage}>{chapter.pagetitle[this.state.language]}</a></li>
            )}
          </ul>
        </Page>;

        const renderedPages = pageData.pages.slice(0, 6);

        const router = new Router({ mode: this.state.routingStrategy });
        // console.log(router.getFragment());

        // const page = this.setupRoute();
        let page = 0;
        if (this.isNumeric(router.getFragment())) {
          page = Number(router.getFragment());
        } else {
          router.navigate('/0');
        }
        const bookmark = Number(localStorage.getItem('bookmark'));

        this.setState((state, props) => ({
          renderedPages,
          pageData,
          // totalPage: this.flipBook.getPageFlip().getPageCount(),
          page: page,
          bookmark: bookmark,
          router: router
        }), () => {
          if (this.state.page > 0) this.flipToPage();
        });


      }, err => {
        alert('Nem sikerült betölteni az oldalt!');
        console.error(err);
      });
    }, err => {
      alert('Nem sikerült betölteni az oldalt.');
      console.error(err);
    });
  }

  // Event handlers

  nextButtonClick = () => {
    this.setState((state, props) => ({
      page: (state.totalPage > state.page) ? state.page + 1 : state.page,
    }), (e) => {
      this.flipToPage();
    });
  };

  prevButtonClick = () => {
    this.setState((state, props) => ({
      page: (0 < state.page) ? state.page - 1 : state.page,
    }), () => {
      this.flipToPage();
    });
  };

  onPage = (e) => {
    this.setState((state, props) => ({
      page: e.data,
    }), () => {
      // eslint-disable-next-line no-restricted-globals
      this.state.router.navigate('/' + this.state.page);
      // history.pushState(e.data, '', e.data);
    });
  };
  createPage(page, pagenumber, language) {
    return <Page
      key={pagenumber}
      pageNumber={pagenumber}
      image={process.env.PUBLIC_URL + '/' + page.imagename}
      imageCaption={page.imagecaption[language]}
      // {(page.type === 'category') ? page.pagetitle[language] : null}
      pageTitle={(page.type === 'category') ? page.pagetitle[language] : undefined}
    ></Page>;
  }

  flipToPage = () => {
    console.log(this.state.page);
    // this.setState((state, props) => ({
    //   pages: this.state.pages.splice(this.state.pages.length - 1, 0,
    //     this.createPage(this.state.pageData[this.state.page - this.state.pageOffset], this.state.language),
    //   )
    // }), () => {
    //   this.flipBook.getPageFlip().flip(Number(this.state.page));
    // });
    this.flipBook.getPageFlip().flip(Number(this.state.page));
  }

  addPageToBookmark = () => {
    this.setState((state, props) => ({
      bookmark: this.state.page
    }), () => {
      localStorage.setItem('bookmark', this.state.bookmark);
    });
  }

  openBookmark = () => {
    // console.log(this.state);
    this.setState((state, props) => ({
      page: this.state.bookmark
    }), () => {
      this.flipToPage();
    });
  }

  // Routing

  navigateToPage = (e) => {
    e.preventDefault();
    this.setState((state, props) => ({
      // page: Number(e.target.pathname.substring(1).split('/')[1]),
      page: Number(e.target.hash.substring(1).split('/')[1]),
    }), () => {
      this.flipToPage();
    });
  }

  updateBook = () => {
    this.setState((state, props) => ({
      // renderedPages: []
      // renderedPages: this.state.pageData.pages.slice(0, 4)
      renderedPages: this.state.renderedPages.splice(0, 5).concat(this.state.pageData.pages.splice(6, 2))
    }));
  }

  // setupRoute() {

  //   console.log('TODO: window.location.pathname', window.location.pathname)
  //   let page = 0;
  //   if (this.pathArray().length > 3 || !this.isNumeric(this.pathArray()[2])) {
  //     // history.pushState(window.location.pathname, '', '/book/0');
  //     history.pushState(null, '', window.location.href + 'book/0');
  //   } else {
  //     page = Number(this.pathArray()[2]);
  //   }
  //   return page;
  // }

  // // Utility functions
  // pathArray = () => {
  //   return window.location.pathname.split('/');
  // }

  // https://stackoverflow.com/a/175787
  isNumeric(str) {
    if (typeof str != 'string') return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

  render() {
    return (
      // <div className='no-select book-container'
      <div className='book-container container-md'
      // style={{ maxHeight: '100vh', maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
      >
        {/* <span>{this.state.isMobile}</span> */}
        <button type={'button'} className={'mt-1 btn btn-success'} onClick={this.addPageToBookmark} title={'Oldal könyvjelzőzése'}>
          <svg xmlns={'http://www.w3.org/2000/svg'} width={'16'} height={'16'} fill={'currentColor'} className={'bi bi-bookmark-plus'} viewBox={'0 0 16 16'}>
            <path fillRule={'evenodd'} d={'M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z'} />
            <path d={'M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z'} />
          </svg>
        </button>
        <button type={'button'} className={'mt-1 btn btn-danger'} onClick={this.openBookmark} title={'Oldal kinyitása a könyvjelzőhöz'}>
          <svg xmlns={'http://www.w3.org/2000/svg'} width={'16'} height={'16'} fill={'currentColor'} className={'bi bi-bookmark-plus'} viewBox={'0 0 16 16'}>
            <path fillRule={'evenodd'} d={'M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z'} />
            <path d={'M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z'} />
          </svg>
        </button>
        <button className="mt-1 btn btn-primary" onClick={this.updateBook}></button>
        <span>{this.state.bookmark}</span>
        {(this.state.renderedPages.length > 0) ?
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

            onFlip={this.onPage}

            className='image-book'

            ref={(el) => (this.flipBook = el)}
          >
            {this.state.renderedPages}
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
}

export default ImageBook;