import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import components from 'constants/components';
import mapStateToPropsGenerator from 'store/mapStateToProps';
import SearchButton from 'common/searchButton';
import { ReactComponent as CartIcon } from 'icons/cart-icon.svg';
import { ReactComponent as MailIcon } from 'icons/mail.svg';
import { ReactComponent as TelIcon } from 'icons/tel-icon.svg';
import { css, useTheme } from '@emotion/react';
import { breakpointsMap } from 'src/constants/styles';
import routesConstants from 'src/constants/routes';
import { useHistory } from 'react-router-dom';
import { headerContext } from './header';

const HeaderTopRight = ({ cartData, openSearch }) => {
  const theme = useTheme();
  const MOBILE_MAX_WIDTH = 720;
  const history = useHistory();
  const {
    cart: { state, onClickHandler, onCloseClickHandler },
  } = useContext(headerContext);

  return (
    <div className="header-top__right">
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          ${breakpointsMap.TABLET} {
            display: none;
          }
        `}
      >
        <a
          href="/"
          css={css`
            display: flex;
            width: 39px;
            height: 39px;
            align-items: center;
            justify-content: center;
            background-color: #f7f7f7;
            color: ${theme.colors.colorText.hex};

            &:hover {
              color: #687894;
            }
          `}
        >
          <TelIcon
            width="12"
            height="13"
            transform="scale(1.3)"
            fill="currentColor"
          />
        </a>
        <a
          href="/"
          css={css`
            display: flex;
            width: 39px;
            height: 39px;
            align-items: center;
            justify-content: center;
            margin-left: 5px;
            background-color: #f7f7f7;

            &:hover {
              color: #946df6;
            }
          `}
        >
          <MailIcon
            width="13.5"
            height="7.5"
            transform="scale(1.7)"
            fill="currentColor"
          />
        </a>
        <div
          className="header-top__right-search-container"
          css={css`
            display: flex;
            width: 39px;
            height: 39px;
            align-items: center;
            justify-content: center;
            margin-left: 5px;
            background-color: #f7f7f7;
          `}
        >
          <SearchButton
            buttonClass="header-top__right-search-button"
            label="Открыть строку поиска"
            action={openSearch}
          />
        </div>
        <a
          href="some"
          className="header-top__link header-top__link--cart"
          aria-label="Перейти на страницу корзины"
          onClick={(evt) => {
            evt.preventDefault();
          }}
          css={css`
            display: flex;
            width: 39px;
            height: 39px;
            align-items: center;
            justify-content: center;
            margin-left: 5px;
            background-color: #f7f7f7;
          `}
        >
          <CartIcon
            className="header-top__list-icon header-top__list-icon--cart"
            width="21"
            height="19"
            fill="currentColor"
            onClick={(evt) => {
              evt.preventDefault();
              if (window.innerWidth < MOBILE_MAX_WIDTH) {
                history.push(routesConstants.CART.route);
              } else {
                onClickHandler();
              }
            }}
          />
          <span
            className="header-top__mobile-list-link-cart-value"
            css={css`
              top: 5px;
              left: 25px;
            `}
          >
            {Object.keys(cartData).length}
          </span>
        </a>
      </div>
      <div
        css={css`
          display: none;
          ${breakpointsMap.TABLET} {
            display: flex;
            align-items: center;
          }
        `}
      >
        <div className="header-top__right-search-container">
          <SearchButton
            buttonClass="header-top__right-search-button"
            label="Открыть строку поиска"
            action={openSearch}
          />
        </div>
        <a
          href="some"
          className="header-top__link header-top__link--cart"
          aria-label="Перейти на страницу корзины"
          css={css`
            ${breakpointsMap.DESKTOP} {
              padding-top: 3px;
            }
          `}
          onClick={(evt) => {
            evt.preventDefault();
          }}
        >
          <CartIcon
            className="header-top__list-icon header-top__list-icon--cart"
            width="21"
            height="19"
            fill="currentColor"
            onClick={(evt) => {
              evt.preventDefault();
              if (window.innerWidth < MOBILE_MAX_WIDTH) {
                history.push(routesConstants.CART.route);
              } else {
                onClickHandler();
              }
            }}
          />
          <span
            className="header-top__mobile-list-link-cart-value"
            css={css`
              ${breakpointsMap.TABLET} {
                top: -2px;
              }
            `}
          >
            {Object.keys(cartData).length}
          </span>
        </a>
      </div>
    </div>
  );
};

HeaderTopRight.propTypes = {
  cartData: PropTypes.objectOf(PropTypes.object).isRequired,
  openSearch: PropTypes.func.isRequired,
};

export default connect(
  mapStateToPropsGenerator(components.CART),
  null,
)(HeaderTopRight);
