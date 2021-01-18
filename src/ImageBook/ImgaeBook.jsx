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
    <div className="page" ref={ref} data-density="0">
      <div className="page-content">
        <h2 className="page-header"> Page header - {props.number} </h2>
        <div className="page-image"> </div>
        <div className="page-text"> {props.children} </div>
        < div className="page-footer" > {props.number + 1} </div>
      </div>
    </div>
  );
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

  onPage = (e) => {
    this.setState({
      page: e.data,
    });
  };

  componentDidMount() {
    this.setState({
      totalPage: this.flipBook.getPageFlip().getPageCount(),
    });
  }

  render() {
    return (
      <div style={{ margin: '3px' }}>
        <HTMLFlipBook
          width={550}
          height={733}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={this.onPage}
          onChangeOrientation={this.onChangeOrientation}
          onChangeState={this.onChangeState}
          className="demo-book"
          ref={(el) => (this.flipBook = el)
          }
        >

          <PageCover>BOOK TITLE </PageCover>
          <Page number={1} > Lorem ipsum...
          <img url="https://scontent.fbud4-1.fna.fbcdn.net/v/t1.15752-0/s261x260/138648964_193063349168753_8926558442558045833_n.jpg?_nc_cat=110&ccb=2&_nc_sid=58c789&_nc_ohc=wAl8KxNHdo8AX-TjyI4&_nc_ht=scontent.fbud4-1.fna&tp=7&oh=81472b692d87c92a11667f718077790f&oe=602C6CEC"></img>
          </Page>
          <Page number={2} > Lorem ipsum...</Page>
          <PageCover> THE END </PageCover>

        </HTMLFlipBook>

        <div className="container" >
          <div>

            <button type="button" onClick={this.prevButtonClick} >
              Previous page
                </button>

                [<span>{this.state.page} </span> of
                <span > {this.state.totalPage} </span>]

                <button type="button" onClick={this.nextButtonClick}>Next page</button>

          </div>
          <div >

            State: <i>{this.state.state} </i>, orientation: <i>{this.state.orientation}</i>

          </div>
        </div>
      </div>
    );
  }
}

export default DemoBook;