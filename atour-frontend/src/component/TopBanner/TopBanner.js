import React from 'react';
import { connect } from 'react-redux';
import { FACEBOOK_KEY } from '../../utils/utils';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import './styles.css';
import { Link } from 'react-router-dom';
import { logout, resizeWindow, login } from '../../action/ApplicationAction';
import logo from '../../image/Atour-logo.jpg';
import autobind from 'react-autobind';
import SideMenu from '../SideMenu/SideMenu';
import ClickOutSide from 'react-click-outside-component';
import PopUpModal from '../../component/PopUpModal/PopUpModal';
import { getSavedTour } from '../../action/UserInfoAction';

class TopBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false,
      isClickedDropdown: false,
      sideMenuStatus: 'hidden',
      topTransparent: props.transparent,
    };
    autobind(this);
  }

  componentDidMount() {
    const { resizeWindow } = this.props;
    document.addEventListener('scroll', this.onScroll);
    window.onresize = function() {
      resizeWindow(window.innerWidth);
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      (this.props.location.pathname === '/' ||
        this.props.location.pathname === '/searchForTour' ||
        this.props.location.pathname === '/searchForGuide') &&
      nextProps.isSearched
    ) {
      if (this.props.userInfo && this.props.userInfo.userId)
        this.props.getSavedTour(this.props.userInfo.userId);
    }
    if (!this.props.userInfo.userId && nextProps.userInfo.userId) {
      nextProps.getSavedTour(nextProps.userInfo.userId);
    }
    if (nextProps.userInfo.userId !== this.props.userInfo.userId) {
      this.setState({ isClickedDropdown: false });
    }
    if (nextProps.width > 710) {
      this.setState({ sideMenuStatus: 'hidden' });
    }
    if (nextProps.transparent !== this.props.transparent) {
      this.setState({ topTransparent: nextProps.transparent });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    // This also can change to dispatch transparent action
    // May need to have variable to know which page need transparent
    const documentBody = document.body.scrollTop || document.documentElement.scrollTop;
    if (documentBody > 90 || !this.props.transparent) {
      this.setState({ topTransparent: false });
    } else {
      this.setState({ topTransparent: true });
    }
  }

  setSideMenuStatus(status) {
    this.setState({ sideMenuStatus: status });
  }

  onClickOpenMenu() {
    const documentBody = document.body.scrollTop || document.documentElement.scrollTop;
    const { sideMenuStatus } = this.state;
    let nextStatus;
    if (sideMenuStatus === 'hidden') {
      nextStatus = 'isShowing';
      this.setState({ topTransparent: false });
    } else if (sideMenuStatus === 'isShowing') {
      nextStatus = 'isHidding';
      if (documentBody <= 90) {
        this.setState({ topTransparent: true });
      }
    }
    // else if (sideMenuStatus === "isHidding") nextStatus = "isShowing";
    else return;
    this.setState({ sideMenuStatus: nextStatus });
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
        data: { url },
      },
      gender,
      birthday,
    } = res;
    const userInfo = {
      firstName: first_name,
      lastName: last_name,
      profileImageUrl: url,
      userId: res.userID,
      gender,
      age: new Date().getFullYear() - parseInt(birthday.substring(6, 10)),
    };
    this.props.login(userInfo);
  }

  renderNotSignIn() {
    return (
      <div className="topbanner-user-container">
        <div className="topbanner-right">
          <FacebookLogin
            appId={FACEBOOK_KEY}
            fields="name,first_name,last_name,birthday,gender,picture.height(2048)"
            scope="public_profile,user_gender,user_birthday"
            autoLoad
            callback={this.loginWithFacebook}
            render={renderProps => (
              <div className="topbanner-menu" onClick={renderProps.onClick}>
                Login via Facebook
              </div>
            )}
          />
        </div>
      </div>
    );
  }

  renderSignIn() {
    const dropDown = this.state.isClickedDropdown ? (
      <ClickOutSide onClickOutside={() => this.setState({ isClickedDropdown: false })}>
        <div className="topbanner-login-dropdown">
          <div>
            <Link to="/editProfile" className="topbanner-link">
              <div
                className="dropdown-item"
                onClick={() => {
                  this.setState({ isClickedDropdown: false });
                }}
              >
                <i className="fa fa-cog topbanner-icon" />
                Edit Contact Info
              </div>
            </Link>
            <Link to="/publishedTour" className="topbanner-link">
              <div
                className="dropdown-item"
                onClick={() => this.setState({ isClickedDropdown: false })}
              >
                <i className="fa fa-calendar topbanner-icon" />
                Published Tour
              </div>
            </Link>
          </div>
          <Link to="/" className="topbanner-link">
            <div
              className="dropdown-item"
              onClick={() => {
                this.setState({ isClickedDropdown: false });
                this.props.logout();
              }}
            >
              <i className="fa fa-sign-out topbanner-icon" />
              Log out
            </div>
          </Link>
        </div>
      </ClickOutSide>
    ) : null;
    return (
      <div className="topbanner-login-container">
        <div
          className="topbanner-login-banner"
          onClick={() => this.setState({ isClickedDropdown: true })}
        >
          <div className="topbanner-atour">Member</div>
          <div className="topbanner-as-firstname">
            {this.props.userInfo.firstName.substring(0, 8)}
          </div>

          <i className="fa fa-chevron-circle-down topbanner-dropdown-arrow" />
        </div>
        {dropDown}
      </div>
    );
  }

  renderSideMenuButton() {
    return (
      <div className="topbanner-menu-minimized-container">
        <div className="topbanner-menu-minimized-btn">
          <i
            className="fa fa-bars topbanner-menu-minimized-icon"
            onClick={() => {
              this.onClickOpenMenu();
            }}
          />
        </div>
      </div>
    );
  }

  renderMenu() {
    const renderSignIn = this.props.userInfo.token ? this.renderSignIn() : this.renderNotSignIn();
    return (
      <div className="topbanner-right-container">
        <div className="topbanner-right topbanner-first">
          <Link
            to={{ pathname: '/searchForTour', state: { isSearch: true } }}
            className="topbanner-link"
          >
            <div className="topbanner-menu">Search for Tour</div>
          </Link>
        </div>
        <div className="topbanner-right">
          <Link to="/searchForUser" className="topbanner-link">
            <div className="topbanner-menu">Search for User</div>
          </Link>
        </div>
        {renderSignIn}
      </div>
    );
  }

  render() {
    const { sideMenuStatus, topTransparent, loginError } = this.state;
    const path = this.props.location.pathname;
    const renderMenu = this.props.width <= 710 ? this.renderSideMenuButton() : this.renderMenu();
    return (
      <div>
        <PopUpModal
          isOpen={loginError ? true : false}
          onCloseModal={() => this.setState({ loginError: false })}
          headerText={'Login Fail'}
          bodyText={'Facebook Auth error'}
        />
        <div className="topbanner">
          <SideMenu
            sideMenuStatus={sideMenuStatus}
            setSideMenuStatus={this.setSideMenuStatus}
            path={path}
          />
          <div className={`topbanner-banner${topTransparent ? '--transparent' : ''}`}>
            <div className="topbanner-logo-container">
              <div className="topbanner-logo">
                <Link to="/">
                  <img className="topbanner-logo-img" src={logo} alt="topbanner-logo" />
                </Link>
              </div>
            </div>
            {renderMenu}
          </div>
        </div>
        <div style={{ height: '50px' }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.user,
  width: state.app.width,
  isSearched: state.search.isSearched,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  login: userInfo => dispatch(login(userInfo)),
  resizeWindow: width => dispatch(resizeWindow(width)),
  getSavedTour: userId => dispatch(getSavedTour(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBanner);
