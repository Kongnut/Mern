import React from "react";
import { connect } from "react-redux";
import { Flex, Box, Image } from "rebass";
import { Redirect } from "react-router-dom";
import { editContactInfo } from "../../action/UserInfoAction";
import { updated } from "../../action/ApplicationAction";
import "./styles.css";
import {
  validateFacebook,
  validateInstagram,
  validatePhone
} from "../../utils/validation";
import logo from "../../image/Atour-logo.jpg";
import Cards from "../Cards/Cards";
import PopUpModal from "../PopUpModal/PopUpModal";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facebookUrl: "",
      phoneNumber: "",
      instagramUrl: "",
      isView: false,
      errorMessage: "",
      saveChanged: false
    };
  }

  componentWillUnmount() {
    const pathname = this.props.location.pathname;
    if (pathname === "/editProfile") this.props.updated();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname === "/viewProfile") {
      this.setState({ isView: true });
      return;
    }
    const { phoneNumber, facebookUrl, instagramUrl } = this.props.ownUser;
    this.setState({ facebookUrl, phoneNumber, instagramUrl, isView: false });
    if (nextProps.isUpdated) {
      this.setState({ saveChanged: true });
      this.props.updated();
    }
  }

  componentDidMount() {
    if (this.props.location.pathname === "/viewProfile")
      this.setState({ isView: true });
    else {
      const { phoneNumber, facebookUrl, instagramUrl } = this.props.ownUser;
      this.setState({ facebookUrl, phoneNumber, instagramUrl });
    }
  }

  editContactInfo() {
    const { facebookUrl, instagramUrl, phoneNumber } = this.state;
    const { token } = this.props.ownUser;
    if (
      facebookUrl !== this.props.ownUser.facebookUrl ||
      phoneNumber !== this.props.ownUser.phoneNumber ||
      instagramUrl !== this.props.ownUser.instagramUrl
    ) {
      const facebookError = validateFacebook(facebookUrl);
      const instagramError = validateInstagram(instagramUrl);
      const phoneError = validatePhone(phoneNumber);
      const isError = facebookError || instagramError || phoneError;
      const errorMessage = facebookError
        ? facebookError + "\n"
        : "" + instagramError
        ? instagramError + "\n"
        : "" + phoneError
        ? phoneError + "\n"
        : "";
      if (!isError) {
        const res = this.props.ownUser;
        res.instagramUrl = instagramUrl;
        res.facebookUrl = facebookUrl;
        res.phoneNumber = phoneNumber;
        this.props.editContactInfo(res, token);
      } else {
        this.setState({ errorMessage });
      }
    }
  }

  getOwn() {
    const {
      firstName,
      lastName,
      gender,
      age,
      profileImageUrl
    } = this.props.ownUser;
    const { instagramUrl, facebookUrl, phoneNumber } = this.state;
    return {
      firstName,
      lastName,
      gender,
      age,
      instagramUrl,
      facebookUrl,
      phoneNumber,
      profileImageUrl
    };
  }

  render() {
    const { isView } = this.state;
    if (!isView && !this.props.ownUser.firstName) return <Redirect to="/" />;
    const {
      firstName,
      lastName,
      gender,
      age,
      instagramUrl,
      facebookUrl,
      phoneNumber,
      profileImageUrl,
      publishedTour
    } = this.state.isView ? this.props.selectedUser : this.getOwn();
    const headerText = isView ? "User Profile" : "Your Profile";
    return (
      <div className="profilePage">
        <PopUpModal
          isOpen={this.state.errorMessage ? true : false}
          onCloseModal={() => this.setState({ errorMessage: "" })}
          headerText="Your Contact is invalid"
          bodyText={this.state.errorMessage}
        />
        <PopUpModal
          isOpen={this.state.saveChanged}
          onCloseModal={() => this.setState({ saveChanged: false })}
          headerText="Your Information is updated"
        />
        <div className="profilePage-header">
          <i className="fa fa-cog profilePage-header-icon" />
          <div className="profilePage-header-text">{headerText}</div>
        </div>
        <div className="profilePage-content-container">
          <Flex className="profilePage-content">
            <Box
              className="profilePage-content-img-container"
              p={3}
              width={[1, 1, 2 / 3, 1 / 3]}
            >
              <div>
                <Image
                  src={profileImageUrl || logo}
                  className="profilePage-content-img"
                />
              </div>
            </Box>
            <Box
              className="profilePage-content-box"
              p={3}
              width={[1, 1, 3 / 4, 1 / 2]}
            >
              <div style={{ fontWeight: "600" }}>Personnal Info</div>
              <div className="profilePage-content-info">
                <Flex>
                  <Box p={3} width={[1, 1, 1 / 2]}>
                    <div>Name</div>
                  </Box>
                  <Box p={3} width={[1, 1, 1 / 2]}>
                    <div className="profilePage-content-info-userinfo">
                      {firstName + " " + lastName}
                    </div>
                  </Box>
                </Flex>
                <Flex>
                  <Box p={3} width={1 / 2}>
                    <div>Age</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    <div className="profilePage-content-info-userinfo">
                      {age}
                    </div>
                  </Box>
                </Flex>
                <Flex>
                  <Box p={3} width={1 / 2}>
                    <div>Gender</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    <div className="profilePage-content-info-userinfo">
                      {gender}
                    </div>
                  </Box>
                </Flex>
              </div>

              <div style={{ fontWeight: "600", marginTop: "30px" }}>
                Contact Info
              </div>
              <div className="profilePage-content-info">
                <Flex>
                  <Box
                    style={isView ? {} : { paddingTop: "22px" }}
                    p={3}
                    width={1 / 2}
                  >
                    <div>Phone Number</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    {isView ? (
                      <div>{phoneNumber}</div>
                    ) : (
                      <input
                        className="form-control"
                        value={phoneNumber}
                        onChange={e =>
                          this.setState({ phoneNumber: e.target.value })
                        }
                      />
                    )}
                  </Box>
                </Flex>
                <Flex>
                  <Box
                    p={3}
                    width={1 / 2}
                    style={isView ? {} : { paddingTop: "22px" }}
                  >
                    <div>Facebook Url</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    {isView ? (
                      <div className="profilePage-url">{facebookUrl}</div>
                    ) : (
                      <input
                        className="form-control"
                        value={facebookUrl}
                        onChange={e =>
                          this.setState({ facebookUrl: e.target.value })
                        }
                      />
                    )}
                  </Box>
                </Flex>
                <Flex>
                  <Box
                    style={isView ? {} : { paddingTop: "22px" }}
                    p={3}
                    width={1 / 2}
                  >
                    <div>Instagram Url</div>
                  </Box>
                  <Box p={3} width={1 / 2}>
                    {isView ? (
                      <div className="profilePage-url">{instagramUrl}</div>
                    ) : (
                      <input
                        className="form-control"
                        value={instagramUrl}
                        onChange={e =>
                          this.setState({ instagramUrl: e.target.value })
                        }
                      />
                    )}
                  </Box>
                </Flex>
              </div>
              {isView ? null : (
                <button
                  onClick={() => this.editContactInfo()}
                  className="btn btn-primary profilePage-save-btn"
                >
                  Save
                </button>
              )}
            </Box>
          </Flex>
        </div>
        {isView ? (
          <div className="profilePage-tour-container">
            <div className="profilePage-tour-header">Tour</div>
            <Cards isUser={false} items={publishedTour} />
          </div>
        ) : null}
        <div style={{ marginBottom: "30px" }} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    firstName,
    lastName,
    profileImageUrl,
    phoneNumber,
    instagramUrl,
    facebookUrl,
    gender,
    age,
    token,
    userId,
    selectedUser
  } = state.user;
  return {
    isUpdated: state.app.isUpdated,
    ownUser: {
      firstName,
      lastName,
      profileImageUrl,
      phoneNumber,
      instagramUrl,
      facebookUrl,
      gender,
      userId,
      age,
      token
    },
    selectedUser
  };
};

const mapDispatchToProps = dispatch => ({
  editContactInfo: (userInfo, token) =>
    dispatch(editContactInfo(userInfo, token)),
  updated: () => dispatch(updated())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
