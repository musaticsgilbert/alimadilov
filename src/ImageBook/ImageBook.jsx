/* eslint-disable no-restricted-globals */
import React from 'react'
import HTMLFlipBook from 'm-react-pageflip';
import './ImageBook.scss';
import { Page, PageCover } from './Page/Page';

class ImageBook extends React.Component {
  constructor(props) {
    super(props);

    const pages = [
      <PageCover key={0} pos='top' bookmark image={process.env.PUBLIC_URL + '/h608.jpg'} onBookmark={this.openBookmark}>Alim Adilov képeskönyve</PageCover>,
      <Page key={1} pageNumber={1} pageTitle={'Önéletrajz'}>
        {/* <article style={{ padding: '2%' }}>
          Alim Adilov is a painter, was born in 1963, Taskent, Uzbekistan.
          During his elementary studies he was enrolled to the best drawing course in the city.<br />
          In 1979 he started the secondary art school, where strict but great knowledged teachers taught him, e.g. the Korean Emil-Ki- Gajt, who did several successful book illustrations. In his 5th year, he learned on advanced level, he grew up as an artist who is ready to work full responsibility.<br />
          After 2 years military service, he applied to the world famous Rjepin Art Academy.<br />
          He had teachers like the internationally reputed Vitrugonszkji.<br />
          After graduating he went to England where he was a designer at a big company, so soon he could start working individually. In 1991, he got a work from an elegant gallery from the London Sloan Square, to organize an exhibition from his works. His all paintings were purchased in one.<br />
          After settling down in Hungary, soon he became popular both professional and artistic field. Besides his professional success, he found his personal happiness, found his wife they have 2 great sons. In the next couple of years, he was the regular invited member of the art art camps in Hungary, and international camps. He had many separately and group exhibition in Hungary and internationally. Now he has a constant exhibition in Madeira.<br /><br />

          He is the member of the Hungarian Art Association.<br />
          His paintings are often bought because this way the buyers can take home a slice from the East, from their holiday. The vivid colors of the paintings are reflectiong the beach, the market, so the owners can feel these moments in their weekdays.<br />
          Favourably, he works on those topics he experienced on his journey. Cities, landscapes, houses but also portraits, still lifes.All over the world he had solo and organised exhibitions, also he has a permanent exhibition on Madeira
        </article> */}
        <article style={{ padding: '2%' }}>
          Alim Adilov Üzbegisztán fõvárosában, Taskentben született 1963-ban és gyerekkorában elkezdett járni mûvészeti szakkörre, ahol Zója Grigorevna kiváló festõmûvésznõ tanította. 8 éves iskolai végzettség után Taskentben 4 éves Mûvészeti technikumot végzett.
          Katonai szolgálat után felvételizett az európai hirû szentpétervári "Repin" Képzõmûvészeti Akadémiara és ott 6 évig tanult, közben részt vett csoportos kiállításokban Szovjetunióban és számos külföldi országban. Akadémia elvégzése után elutazott Londonba, ahol részt vett a "Canvas" mûvészeti tanfolyamban.
          <br />1993 óta hazankban él és alkot. 2004-tõl a Magyar Alkotomûvészek Országos Egyesületének tagja. Többnyire vegyes technikával, vegyes témákban dolgozik. Mûvésztelepeknek rendszeres tagja.
          <br />"Alim Adilov festõmûvész rohanó életünk elé olyan festményeket állít, melyekbõl sugárzik a természet varázsa és a Teremtõ jósága. Képei, mint bástyák dacolnak a háborgó világ forgatagával, idõk és korok múlásával."
          <br />
          Csoportos kiállitások: Szentpétervár, Moszkva, Rosztov, Taskent, Tokyo, Kuala Lumpur, Budapest, Debrecen, Békéscsaba
          Önálló kiállítások: London, Békéscsaba, Miskolc, Debrecen, Gödöllõ, Kecskemét, Budapest, Malaysia (Puchong), Kuala Lumpur
          Állandó kiállítás: Madeira
        </article>
      </Page>,
      <Page key={2} pageNumber={2} pageTitle={'Tartalomjegyzék'}>
        <ol>
          <li><a href='1' onClick={this.navigateToPage}>Önéletrajz</a></li>
          <li><a href='2' onClick={this.navigateToPage}>Tengerparton</a></li>
          <li><a href='3' onClick={this.navigateToPage}>Cserépedények</a></li>
          <li><a href='4' onClick={this.navigateToPage}>Virágok az ablakban</a></li>
          <li><a href='5' onClick={this.navigateToPage}>Átjáró</a></li>
        </ol>
      </Page>,
      <Page key={3} pageNumber={3} image={process.env.PUBLIC_URL + '/h608.jpg'} imageCaption={'Tengerparton'}></Page>,
      <Page key={4} pageNumber={4} image={process.env.PUBLIC_URL + '/h503.jpg'} imageCaption={'Cserépedények'}></Page>,
      <Page key={5} pageNumber={5} image={process.env.PUBLIC_URL + '/h607.jpg'} imageCaption={'Virágok az ablakban'}></Page>,
      <Page key={6} pageNumber={6} image={process.env.PUBLIC_URL + '/f1014.jpg'} imageCaption={'Átjáró'}></Page>,
      <PageCover key={7} image={process.env.PUBLIC_URL + '/h608.jpg'} pos='bottom'></PageCover>
    ];

    this.state = {
      bookmark: null,
      page: 0,
      pages: pages,
      orientation: 'landscape',
      state: 'read',
      totalPage: 0,
    };
  }

  // Lifecycle management
  componentDidMount() {
    const page = this.setupRoute();
    const bookmark = localStorage.getItem('bookmark');

    this.setState((state, props) => ({
      totalPage: this.flipBook.getPageFlip().getPageCount(),
      page: page,
      bookmark: bookmark
    }), () => {
      this.flipToPage();
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
      history.pushState(e.data, '', e.data);
    });
  };

  onChangeOrientation = (e) => {
    this.setState((state, props) => ({
      orientation: e.data,
    }));
  }

  onChangeState = (e) => {
    this.setState((state, props) => ({
      state: e.data,
    }));
  }

  flipToPage = () => {
    // console.log(this.state.page);
    this.flipBook.getPageFlip().flip(this.state.page + 1);
  }

  addPageToBookmark = () => {
    this.setState((state, props) => ({
      bookmark: this.state.page
    }), () => {
      localStorage.setItem('bookmark', this.state.bookmark);
    });
  }

  openBookmark = () => {
    this.setState((state, props) => ({
      page: this.state.bookmark
    }), () => {
      this.flipToPage(this.state.bookmark);
    });
  }

  // Routing

  navigateToPage = (e) => {
    e.preventDefault();
    // console.dir(e.target.pathname.substring(1).split('/')[1]);
    this.setState((state, props) => ({
      page: Number(e.target.pathname.substring(1).split('/')[1]),
    }), () => {
      this.flipToPage();
    });
  }

  setupRoute() {
    console.log('TODO: window.location.pathname', window.location.pathname)
    let page = 0;
    if (this.pathArray().length > 3 || !this.isNumeric(this.pathArray()[2])) {
      history.pushState(window.location.pathname, '', '/book/0');
    } else {
      page = Number(this.pathArray()[2]);
    }
    return page;
  }

  // Utility functions
  pathArray = () => {
    return window.location.pathname.split('/');
  }

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
          onChangeOrientation={this.onChangeOrientation}
          onChangeState={this.onChangeState}

          className='image-book'

          ref={(el) => (this.flipBook = el)}
        >
          {this.state.pages}
        </HTMLFlipBook>

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