import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import autobind from "react-autobind";
import { Redirect } from "react-router-dom";
import { getOtherUserInfo } from "../../action/UserInfoAction";
import { editTour, deleteTour, deleted } from "../../action/TourAction";
import { selectUser } from "../../action/SelectAction";
import tourImage from "../../image/TourImage.png";
import EditTourModal from "../EditTourModal/EditTourModal";
import { editTourModal } from "../../action/ModalAction";
import PopUpModal from "../PopUpModal/PopUpModal";

class TourInfo extends React.Component {
  constructor() {
    super();
    window.scrollTo(0, 0);
    this.state = {
      redirect: false,
      start: true,
      confirmationModal: false,
      confirmationOnclick: () => null,
      isDeleted: false,
      confirmHeader: "",
      confirmMessage: "",
      isDanger: false,
      to: "/"
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
    if (nextProps.isDeleted) {
      this.props.deleted();
      this.setState({ isDeleted: true });
    }
  }

  tourConfigButton() {
    const {
      screenWidth,
      tourInfo,
      user: { token }
    } = this.props;
    const buttonContainerStyle = screenWidth <= 800 ? { width: "125px" } : null;
    return this.props.tourInfo.isPublished ? (
      <div style={buttonContainerStyle}>
        <button
          onClick={() => {
            this.props.onClickEditTour(tourInfo, token);
          }}
          className="btn tourInfo-edit-btn"
        >
          Edit Tour
        </button>
        <button
          onClick={() => {
            this.setState({
              confirmationModal: true,
              isDanger: true,
              confirmHeader: "Unpublish this tour ?",
              confirmMessage:
                "This tour will be unpublished.Other user will not able to search for this tour. It will not be deleted you can republish it at anytime",
              confirmationOnclick: () =>
                this.props.onClickUnpublishTour(tourInfo, token)
            });
          }}
          className="btn tourInfo-danger-btn"
        >
          Unpublish Tour
        </button>
      </div>
    ) : (
      <div style={buttonContainerStyle}>
        <button
          onClick={() => {
            this.setState({
              confirmationModal: true,
              isDange: false,
              confirmHeader: "Republish this tour ?",
              confirmMessage:
                "This tour will be republished. Other user will able to search for this tour",
              confirmationOnclick: () =>
                this.props.onClickRepublishTour(tourInfo, token)
            });
          }}
          className="btn tourInfo-edit-btn"
        >
          Republish Tour
        </button>
        <button
          onClick={() => {
            this.setState({
              confirmationModal: true,
              isDanger: true,
              confirmHeader: "Delete this tour ?",
              confirmMessage:
                "This tour will be deleted. It is unable to recover after delete.",
              confirmationOnclick: () => {
                this.props.onClickDeleteTour(tourInfo, token);
              }
            });
          }}
          className="btn tourInfo-danger-btn"
        >
          Delete Tour
        </button>
      </div>
    );
  }

  render() {
    if (!this.props.tourInfo.tourName || this.state.redirect) {
      return <Redirect to={this.state.to} />;
    }
    const {
      tourName,
      price,
      detail,
      maximumSize,
      minimumSize
    } = this.props.tourInfo;
    const infoOrEdit =
      this.props.tourInfo.userId === this.props.user.userId ? (
        this.tourConfigButton()
      ) : (
        <div
          onClick={() => {
            this.props.selectUser(this.props.otherUserInfo);
            this.setState({ redirect: true, to: "/viewProfile" });
          }}
          className="tourInfo-userName"
        >
          by{" "}
          {this.props.otherUserInfo ? this.props.otherUserInfo.firstName : ""}
        </div>
      );
    const { screenWidth } = this.props;
    const imageHeight =
      screenWidth >= 950 ? "400px" : (screenWidth / 950) * 400 + "px";
    return (
      <div>
        <EditTourModal />
        <PopUpModal
          isOpen={this.state.isDeleted}
          onCloseModal={() => this.setState({ redirect: true })}
          headerText={this.props.tourInfo.tourName + " is deleted"}
          bodyText="You will be redirected to Home page"
        />
        <PopUpModal
          isOpen={this.state.confirmationModal}
          onConfirm={() => {
            this.state.confirmationOnclick();
          }}
          onCloseModal={() => {
            this.setState({ confirmationModal: false });
          }}
          type="Confirmation"
          isDanger={this.state.isDanger}
          headerText={this.state.confirmHeader}
          bodyText={this.state.confirmMessage}
        />
        <div style={{ marginBottom: "100px" }}>
          <div className="tourInfo-container">
            <div className="tourInfo-above-divider">
              <div className="tourInfo-header">
                <div className="tourInfo-headerText">{tourName}</div>
              </div>
              <div className="tourInfo-user-container">{infoOrEdit}</div>
            </div>
            <hr className="tourInfo-divider" />
            <img
              style={{
                width: "100%",
                height: screenWidth * 0.8 * 0.67 + "px",
                marginBottom: "50px"
              }}
              alt="tour"
              src={this.props.tourInfo.imageUrl || tourImage}
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
    isDeleted: state.tour.isDeleted,
    otherUserInfo: state.tour.otherUserInfo,
    user: state.user,
    screenWidth: state.app.width
  };
};

const mapDispatchToProps = dispatch => ({
  selectUser: user => dispatch(selectUser(user)),
  deleted: () => dispatch(deleted()),
  getOtherUserInfo: userId => dispatch(getOtherUserInfo(userId)),
  onClickEditTour: () => {
    dispatch(editTourModal(true));
  },
  onClickUnpublishTour: (tour, token) => {
    tour.isPublished = false;
    dispatch(editTour(tour, token));
  },
  onClickRepublishTour: (tour, token) => {
    tour.isPublished = true;
    dispatch(editTour(tour, token));
  },
  onClickDeleteTour: (tour, token) => {
    dispatch(deleteTour(tour, token));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TourInfo);
