import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import autobind from "react-autobind";
import { Redirect } from "react-router-dom";
import { getOtherUserInfo } from "../../action/UserInfoAction";
import { selectUser } from "../../action/SelectAction";
import tourImage from "../../image/TourImage.png";
import { Parallax } from "react-parallax";
import EditTourModal from "../EditTourModal/EditTourModal";
import { editTourModal } from "../../action/ModalAction";

class TourInfo extends React.Component {
  constructor() {
    super();
    window.scrollTo(0, 0);
    this.state = {
      redirect: false,
      start: true
    };
    autobind(this);
  }

  componentDidMount() {
    this.props.getOtherUserInfo(this.props.tourInfo.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.start && nextProps.tourInfo.userId) {
      this.setState({
        groupSize: nextProps.tourInfo.minimumSize,
        start: false
      });
      this.props.getOtherUserInfo(nextProps.tourInfo.userId);
    }
  }

  render() {
    if (!this.props.tourInfo.tourName) {
      return <Redirect to="/" />;
    }
    const {
      tourName,
      price,
      detail,
      maximumSize,
      minimumSize
    } = this.props.tourInfo;
    if (this.state.redirect) {
      return <Redirect to="/viewProfile" />;
    }
    const infoOrEdit =
      this.props.tourInfo.userId === this.props.user.userId ? (
        <button
          onClick={() => this.props.onClickEditTour()}
          className="btn btn-primary tourInfo-edit-btn"
        >
          Edit Tour
        </button>
      ) : (
        <div
          onClick={() => {
            this.props.selectUser(this.props.otherUserInfo);
            this.setState({ redirect: true });
          }}
          className="tourInfo-userName"
        >
          by{" "}
          {this.props.otherUserInfo ? this.props.otherUserInfo.firstName : ""}
        </div>
      );
    return (
      <div>
        <EditTourModal />
        <div style={{ marginBottom: "100px" }}>
          {/* <img src={tourImage} className="tourInfo-image" alt="" /> */}
          <div className="tourInfo-container">
            <div className="tourInfo-above-divider">
              <div className="tourInfo-header">
                <div className="tourInfo-headerText">{tourName}</div>
              </div>
              <div className="tourInfo-user-container">{infoOrEdit}</div>
            </div>
            <hr className="tourInfo-divider" />
            <Parallax
              bgImage={
                this.props.tourInfo.imageUrl === null
                  ? tourImage
                  : this.props.tourInfo.imageUrl
              }
              bgImageAlt="the cat"
              strength={300}
              style={{ width: "100%", height: "400px", marginBottom: "50px" }}
            />
            <div className="tourInfo-detail-container">
              <div className="tourInfo-detail">{detail}</div>

              <div className="tourInfo-info-container">
                <div className="tourInfo-info-header">
                  Tour Info and User Contact
                </div>
                <hr />
                <div className="tourInfo-info-header-item"> Group size</div>
                <div className="tourInfo-info-item">
                  {`${minimumSize} - ${maximumSize}`}
                </div>
                <div className="tourInfo-info-header-item">Price</div>
                <div className="tourInfo-info-price-container">
                  <div className="tourInfo-info-item">{price} bath</div>
                </div>
                <div className="tourInfo-info-header-item">Phone Number</div>
                <div className="tourInfo-info-item">
                  {this.props.otherUserInfo
                    ? this.props.otherUserInfo.phoneNumber || "-"
                    : "-"}
                </div>

                {this.props.otherUserInfo &&
                  this.props.otherUserInfo.facebookUrl && (
                    <a
                      href={this.props.otherUserInfo.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-facebook-square tourInfo-info-facebook" />
                    </a>
                  )}
                {this.props.otherUserInfo &&
                  this.props.otherUserInfo.instagramUrl && (
                    <a
                      href={this.props.otherUserInfo.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-instagram tourInfo-info-instagram" />
                    </a>
                  )}
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tourInfo: state.tour.selectedTour,
    otherUserInfo: state.tour.otherUserInfo,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  selectUser: user => dispatch(selectUser(user)),
  getOtherUserInfo: userId => dispatch(getOtherUserInfo(userId)),
  onClickEditTour: () => {
    dispatch(editTourModal(true));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourInfo);
