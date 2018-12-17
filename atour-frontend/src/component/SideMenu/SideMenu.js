import React from "react";
import { connect } from "react-redux";
import { FACEBOOK_KEY } from "../../utils/utils";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { logout, login } from "../../action/ApplicationAction";
import PopUpModal from "../../component/PopUpModal/PopUpModal";
import { Link } from "react-router-dom";
import "./styles.css";
import $ from "jquery";

class SideMenu extends React.Component {
  constructor() {
    super();
    this.state = { loginError: false };
  }
  componentDidMount() {
    $(".side-menu-menu").bind(
      "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      () => this.toHidden()
    );
  }

  onLogOutSideMenu() {
    this.onCloseSideMenu();
    this.props.logout();
  }

  toHidden() {
    if (this.props.sideMenuStatus === "isHidding")
      this.props.setSideMenuStatus("hidden");
  }

  loginWithFacebook(res) {
    if (res.error) {
      this.setState({ loginError: true });
      return;
    }
    const {
      first_name,
      last_name,
      picture: {
        data: { url }
      },
      gender,
      birthday
    } = res;
    const userInfo = {
      firstName: first_name,
      lastName: last_name,
      profileImageUrl: url,
      userId: res.userID,
      gender,
      age: new Date().getFullYear() - parseInt(birthday.substring(6, 10))
    };
    this.props.login(userInfo);
  }

  renderNotSignInSideMenu() {
    return (
      <FacebookLogin
        appId={FACEBOOK_KEY}
        fields="name,first_name,last_name,birthday,gender,picture.height(2048)"
        scope="public_profile,user_gender,user_birthday"
        autoLoad
        callback={res => {
          this.loginWithFacebook(res);
          if (!res.error) this.onCloseSideMenu();
        }}
        render={renderProps => (
          <div
            className={"dropdown-item side-menu-item"}
            onClick={renderProps.onClick}
          >
            <i className="fa fa-facebook sidemenu-icon" />
            Login via facebook
          </div>
        )}
      />
    );
  }

  renderSignInSideMenu() {
    const {
      path,
      user: { firstName }
    } = this.props;
    return (
      <div>
        <div className="dropdown-item side-menu-userInfo">
          {firstName.substring(0, 8)}
        </div>
        <Link className="side-menu-link" to="/editProfile">
          <div
            className={
              "dropdown-item side-menu-item side-menu-user" +
              (path === "/editProfile" ? " side-menu-selected-item" : "")
            }
            onClick={() => this.onCloseSideMenu()}
          >
            <i className="fa fa-cog topbanner-icon" />
            Edit Contact Info
          </div>
        </Link>
        <Link className="side-menu-link" to="/publishedTour">
          <div
            className={
              "dropdown-item side-menu-item side-menu-user" +
              (path === "/publishedTour" ? " side-menu-selected-item" : "")
            }
            onClick={() => this.onCloseSideMenu()}
          >
            <i className="fa fa-calendar topbanner-icon" />
            Published Tour
          </div>
        </Link>
        <Link className="side-menu-link" to="/">
          <div
            className="dropdown-item side-menu-item side-menu-user"
            onClick={() => this.onLogOutSideMenu()}
          >
            <i className="fa fa-sign-out topbanner-icon" />
            Log out
          </div>
        </Link>
      </div>
    );
  }

  renderSideMenu() {
    const renderUserInfo = this.props.user.token
      ? this.renderSignInSideMenu()
      : this.renderNotSignInSideMenu();
    return (
      <div>
        <div className="side-menu" />
        <Link className="side-menu-link" to="/searchForTour">
          <div
            className={"dropdown-item side-menu-item"}
            onClick={() => this.onCloseSideMenu()}
          >
            <i className="fa fa-search topbanner-icon" /> Search for Tour
          </div>
        </Link>
        <Link className="side-menu-link" to="/searchForUser">
          <div
            className="dropdown-item side-menu-item"
            onClick={() => this.onCloseSideMenu()}
          >
            <i className="fa fa-search topbanner-icon" /> Search for User
          </div>
        </Link>
        {renderUserInfo}
      </div>
    );
  }

  onClickOpenMenu() {
    const { sideMenuStatus } = this.props;
    let nextStatus;
    if (sideMenuStatus === "hidden") nextStatus = "isShowing";
    else if (sideMenuStatus === "isShowing") nextStatus = "isHidding";
    else return;
    this.props.setSideMenuStatus(nextStatus);
  }

  onCloseSideMenu() {
    if (this.props.sideMenuStatus === "isShowing") {
      this.props.setSideMenuStatus("isHidding");
    }
  }

  renderSideMenuButton() {
    return (
      <div className="side-menu-container">
        <div className="side-menu-btn">
          <i
            className="fa fa-bars side-menu-icon"
            onClick={() => {
              this.onClickOpenMenu();
            }}
          />
        </div>
      </div>
    );
  }

  render() {
    const { sideMenuStatus } = this.props;
    const { loginError } = this.state;
    const MenuClassName = "side-menu-menu " + sideMenuStatus;
    const Menu = sideMenuStatus === "hidden" ? null : this.renderSideMenu();
    const height = sideMenuStatus === "hidden" ? 0 : window.innerHeight;
    return (
      <div className={MenuClassName} style={{ height }}>
        <PopUpModal
          isOpen={loginError ? true : false}
          onCloseModal={() => this.setState({ loginError: false })}
          headerText={"Login Fail"}
          bodyText={"Facebook Auth error"}
        />
        {Menu}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  login: userInfo => dispatch(login(userInfo))
});

const mapStateToProps = state => ({
  user: state.user,
  width: state.app.width
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
