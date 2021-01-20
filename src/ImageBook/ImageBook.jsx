import React from 'react'
import HTMLFlipBook from "react-pageflip";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard" >
      <div className="page-content" >
        <h2>{props.children} </h2>
      </div>
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
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
              style={{ backgroundImage: "url(" + props.image + ")", objectFit: 'contain' }}
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

  function showFullImage() {
    console.log('click');
  }
});

class DemoBook extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      totalPage: 0,
    };
  }

  nextButtonClick = () => {
    this.flipBook.getPageFlip().flipNext();
  };

  prevButtonClick = () => {
    this.flipBook.getPageFlip().flipPrev();
  };

  renderFullScreen = () => {
    document.getElementsByTagName('HTMLFlipBook')[0].requestFullscreen();
  }

  onPage = (e) => {
    this.setState({
      page: e.data,
    });
  };

  onChangeOrientation = (e) => {
    this.setState({
      orientation: e.data,
    });
  }

  onChangeState = (e) => {
    this.setState({
      state: e.data,
    });
  }

  componentDidMount() {
    console.log('TODO: Fork page-flip and react-pageflip and make an option to flip only if the clicked element is not an image (UI/UI.ts onMouseUp)');
    console.log('TODO: on image click make it appear in full size in a popup)');
    this.setState({
      totalPage: this.flipBook.getPageFlip().getPageCount(),
    });
  }

  render() {
    return (
      <div className="no-select book-container" style={{ maxHeight: '100vh', maxWidth: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <HTMLFlipBook
          width={500}
          height={700}
          // minWidth={315}
          // maxWidth={1000}
          // minHeight={400}
          // maxHeight={1533}
          // size="stretch"
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          drawShadow={true}
          onFlip={this.onPage}
          onChangeOrientation={this.onChangeOrientation}
          onChangeState={this.onChangeState}
          className="image-book flip-book html-book"
          ref={(el) => (this.flipBook = el)}
        >

          <PageCover>Alim Adilov képeskönyve</PageCover>
          <Page imageCaption={"Tartalomjegyzék"}>
            <ol>
              <li>Önéletrajz</li>
              <li>Tengerparton</li>
              <li>Cserépedények</li>
              <li>Virágok az ablakban</li>
              <li>Délben</li>
            </ol>
          </Page>
          <Page number={1} imageCaption={"Önéletrajz"}>
            <article style={{ padding: '2%' }}>
              <span>Alim Adilov, magyar szórenddel Adilov Alim (Taskent, 1963– ) Magyarországon élő üzbég festőművész.</span>
              <h4>Élete</h4>
              <span>
                1963-ban született Üzbegisztán fővárosában, Taskentben, édesapja grafikus, édesanyja iparművész volt. Gyermekéveit is ott töltötte, szülei hatására már akkor sokat rajzolt, céltudatosan művész akart lenni. Ennek érdekében több rajzszakkörbe is járt, majd egy képzőművészeti középiskolában érettségizett; mindig törekedett arra, hogy a kiválóak közül is a legjobb legyen. Katonai szolgálatát Kazahsztánban teljesítette, majd a szentpétervári Repin Képzőművészeti Akadémián végezte tanulmányait, mesterei Mojszenkó és Vitrugatszkij voltak. 1991 és 1993 között a londoni akadémián fejlesztette tovább a tudását, egy ottani kétéves kurzus elvégzésével.
                <br />
                1993-ban Magyarországon települt le; 2003-ban költözött Solymárra, szándéka szerint hosszú időre; választásában motiválta Budapest közelsége mellett a szép környezet, és a táj nyugalma, inspiráló békéje is. 2004 óta tagja a Magyar Alkotóművészek Országos Egyesületének.
              </span>
            </article>
          </Page>
          <Page number={2} image={process.env.PUBLIC_URL + "/h608.jpg"} imageCaption={"Tengerparton"}></Page>
          <Page number={3} image={process.env.PUBLIC_URL + "/h503.jpg"} imageCaption={"Cserépedények"}></Page>
          <Page number={4} image={process.env.PUBLIC_URL + "/h607.jpg"} imageCaption={"Virágok az ablakban"}></Page>
          <Page number={5} image={process.env.PUBLIC_URL + "/f1014.jpg"} imageCaption={"Délben"}></Page>
          <PageCover>  </PageCover>

        </HTMLFlipBook>

        <div className="pageturner-container">
          <div>

            <button type="button" onClick={this.prevButtonClick}>Előző oldal</button>

            [<span>{this.state.page}</span> of <span> {this.state.totalPage} </span>]

            <button type="button" onClick={this.nextButtonClick}>Következő oldal</button>

            {/* <button type="button" onClick={this.renderFullScreen}>Teljes képernyős mód</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default DemoBook;