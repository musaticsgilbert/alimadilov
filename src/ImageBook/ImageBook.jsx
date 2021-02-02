import React from 'react'
import HTMLFlipBook from "m-react-pageflip";
import "./ImageBook.scss";
import { Page, PageCover } from "./Page/Page";

class ImageBook extends React.Component {
  constructor(props) {
    super(props);

    const pages = [
      <PageCover key={0} pos="top">Alim Adilov képeskönyve</PageCover>,
      <Page key={1} imageCaption={"Tartalomjegyzék"}>
        <ol>
          <li><a href="1" onClick={this.navigateToPage}>Önéletrajz</a></li>
          <li><a href="2" onClick={this.navigateToPage}>Tengerparton</a></li>
          <li><a href="3" onClick={this.navigateToPage}>Cserépedények</a></li>
          <li><a href="4" onClick={this.navigateToPage}>Virágok az ablakban</a></li>
          <li><a href="5" onClick={this.navigateToPage}>Átjáró</a></li>
        </ol>
      </Page>,
      <Page key={2} number={1} imageCaption={"Önéletrajz"}>
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
      <Page key={3} number={2} image={process.env.PUBLIC_URL + "/h608.jpg"} imageCaption={"Tengerparton"}></Page>,
      <Page key={4} number={3} image={process.env.PUBLIC_URL + "/h503.jpg"} imageCaption={"Cserépedények"}></Page>,
      <Page key={5} number={4} image={process.env.PUBLIC_URL + "/h607.jpg"} imageCaption={"Virágok az ablakban"}></Page>,
      <Page key={6} number={5} image={process.env.PUBLIC_URL + "/f1014.jpg"} imageCaption={"Átjáró"}></Page>,
      <PageCover key={7} pos="bottom">  </PageCover>
    ]

    this.state = {
      page: 0,
      totalPage: 0,
      orientation: 'landscape',
      state: 'read',
      pages: pages
    };
  }

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
    // console.log(e);
    this.setState((state, props) => ({
      state: e.data,
    }));
  }

  navigateToPage = (e) => {
    e.preventDefault();
    console.dir(e.target.pathname.substring(1));
    this.setState((state, props) => ({
      page: Number(e.target.pathname.substring(1)),
    }), () => {
      this.flipToPage();
      // eslint-disable-next-line no-restricted-globals
      history.pushState(e.target.href, '', e.target.href);
    });
  }

  flipToPage = () => {
    console.log(this.state.page);
    this.flipBook.getPageFlip().flip(this.state.page);
  }

  componentDidMount() {
    // eslint-disable-next-line no-restricted-globals
    console.log(history.state);
    this.setState((state, props) => ({
      totalPage: this.flipBook.getPageFlip().getPageCount(),
    }));
  }

  render() {
    return (
      <div className="container-md no-select book-container"
      // style={{ maxHeight: '100vh', maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
      >
        <HTMLFlipBook
          width={700}
          height={900}
          minWidth={300}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1700}
          size="stretch"
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          flippingTime={700}
          clickEventForward={['img', 'button', 'a']}
          drawShadow={true}
          onFlip={this.onPage}
          onChangeOrientation={this.onChangeOrientation}
          onChangeState={this.onChangeState}
          swipeDistance={20}
          className="image-book flip-book html-book"
          useMouseEvents={true}

          ref={(el) => (this.flipBook = el)}
        >
          {this.state.pages}
        </HTMLFlipBook>

        <div className="pageturner-container">
          <div>

            <button type="button" onClick={this.prevButtonClick}>Előző oldal</button>

            [<span>{this.state.page}</span> of <span> {this.state.totalPage} </span>]

            <button type="button" onClick={this.nextButtonClick}>Következő oldal</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageBook;