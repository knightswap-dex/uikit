/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import Overlay from "../../components/Overlay/Overlay";
import { Flex } from "../../components/Flex";
import { useMatchBreakpoints } from "../../hooks";
import Logo from "./Logo";
import Panel from "./Panel";
import UserBlock from "./UserBlock";
import { NavProps } from "./types";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import Avatar from "./Avatar";
import { Button, Modal } from "react-bootstrap"


const Wrapper = styled.div`
  position: relative;
  width: 100%;
  
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color:transparent;
  border-bottom: solid 2px rgba(133, 133, 133, 0.1);
  z-index: 20;
  transform: translate3d(0, 0, 0);
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  margin-top: ${({ showMenu }) => (showMenu ? `${MENU_HEIGHT}px` : 0)};
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
  }
`;

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;

  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;

const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  isDark,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  cakePriceUsd,
  links,
  priceLink,
  profile,
  children,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const homeLink = links.find((link) => link.label === "Home");

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={isDark}
          href={homeLink?.href ?? "/"}
        />
        <Flex>
          <div className="hdr-nav-wrp">
            <div className="global">


              <div className="model-main-r">
              <Modal show={show} onHide={handleClose}>
                 
                 <div className="token-icon">
                   <div>
                   
                   <a href="#"><img src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAYAAADFw8lbAAAABHNCSVQICAgIfAhkiAAAA1pJREFUWEfNmU1ME0EUx2f2o7QUtiJB+YigiZpoAIPExIMSRY3BePJmjDcTkegFo/HuwSMeOIAnP+OReDAxisYgF2PAGIGQGCR8GgWKpcBud7e77pJM3U4YZj+mG/bSbufNe7++ef952ykEjss0zcumPHsbiNIBKEiScyyM96aWXDZ1eZKL1TyEED5zxoToRlfm+oyF/lZt4ZWkp74CU/0TBlteDBgpB4LUDISKtpRY0TbExfacQQYboPraxGv918sLysSD0OFIASP7OkGk5lq/EK87Z9tAe7m12ac962MdoS81LSuxQ10pYdfFe3y0ugdmldkhZfTWUW3xLW1e6ON82UkQb3z8nYtWNkJDW0mnB+tLTHUpdBBqQD4OEqenZMjHiqFhZI2Vd1JOVNTJIRskziZVwEXKmYNy0VpgKNPMvk5BQCPVV0CsvhfII9eBOv+CCSxzUASJ6FjBMgXFIVnCMgMlQbKCZQJKg2QBGxiUBKlZIhItUeGX35oNBEqrSdq4l+3ANygUEkBqGQPAenVeeMZIsOmBw572Wd+gNhxf2gBKjr3JwZKWlcWW5RlUsB4Q9OVPuSQiWHn8bt7mjtuRmoDbDuYJFAVT559bXac9B2uXgamncvckOxzKSwdzDYovHw6LKP3a0XYDV6Ak4ax9acsrAztjpbbAsMut3VYCcwVaCOF4FZhrUCesX+G4Fdhm+6sn0I0fVwGFg9d2QVSPf1O/wiEJcatO5TmjyBlJYDgEqTPhAqO1U9+gmwkMBUOw26LXIyi8jaLP9eQAEHa2bI+nJxosq0c820+gpXeCkDKLbGidp6A1ijsnwQaFZJpRUhmwgCwI6FYdjLa8BdlHaUHxDkazp40zExMtUNDx/6Bqcjk92LDD1P4G9cl+PhcD0qmfaU6UJGgoc8Prox1N+mI/+0ABPfJlJ0D8yJMRrqiywT5xvqpOP+qWxzu33Ylz9OB9pajm8h0YqereOBc15Jn3mZne1sxkV8AcsJsu1t4ARXU3PwvFe4/bXnMHuMbqj4/q0ocm7XeflF0ZBiC7xi6qW09WTfKJZiBWnFeE3Ze+Icg8UPsmq8y3Q8B1QDGxHwCOd+uflZ1pZDLAWJ+yyrGXj1Z1O/0Sj8Qt4xJWAG79WH+CrZJs/wFbVbVOjMd02wAAAABJRU5ErkJggg==" alt="alternatetext" width="24px" /></a>
                   <span className="c-model">Binance Smart Chain</span>
                      </div>
                   <div className="ftm-wrp">
                   <a href="https://dark.knightswap.financial/" target="_blank "><img src=" data:image/png;base64,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" alt="alternatetext" width="24px" /></a>
                   <span className="c-model">Fantom</span>
                   </div>
                 </div>
                 <Modal.Footer>
                   <Button className="close-butn-bg" variant="secondary" onClick={handleClose}>
                     Close
                   </Button>
                   {/* <Button variant="primary" onClick={handleClose}>
                     Save Changes
                   </Button> */}
                 </Modal.Footer>
             </Modal>
              </div>
              {/* <div className="language-list-wrp">
                <a href="#"><img src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABHNCSVQICAgIfAhkiAAAA5ZJREFUSEulV9tx2lAQvSshhkzCo4OQj2TgK3YFJhUYV2BcgXEFxhUYVxBSgXEFJhUEf5kkP3IFCZBMCCBtzuqBHqAHjmZsz1xd79k999yzK1I5H738rq2RfqSID0ipulKEH6VYqZ/4PSZWI4t5bM2/3uUJiRhpT71WrJTOFamOD5QdlE1kM1jOFjdKmUhq95MILBXqmnYdVMYPqGpo22q0/jUZBeHqNaNcapNGH6MQbFq2fWHNvw13Qe8ENirNPpE6d6nkz2ypXhRsO1Sx2jSx+jr+hln1V7PHi/j6FrBRaQyI6NQBtflsNZ8MsulVqlhpDnEkx7v2MvNgNZuchd9FgP1KUeVUra3W6vf3cR5Q4+XbA1Uo3CNYLWk/Kr9B5V3//QbYPVP91ql0vT7MC1p41WiRTrdpoD6YZVsn/pl7wFBvtfRFhLQPvUa50dkWVRpHbC6ni0NRuwNcrDR6iuhShLSaTlp56JU9RrWBAFTNu9/Zx3y1nE16LrCnSNviD1nqDYM8C1hJ1ZM35J8tqn1AtQf7ZO8zFfkfVndQt8TZulr+PimQNjTHVJcvAdHGC1G+C+LRKCqnQgGaSXiwj0DXCOd0xGx3V7OvsLn9nihjC+jDtUnH2zXNuT7E5Pi5E9nTkgBHBALKR3Cqq33OWpUadbWYmNkpOwz9kMZCEBb+bj9YRIaMTEm60cYYZJ2Yh1lNICkJHy8ROCt7yXr1lw/jlXp3+xjvW17Cw+X08cSP99/Arpb4Ezy4I1QbRT6Gx+NMqR5POrimLtV4/7QRV1aFu4/DNZy0+xw2JbFXTad7WaNwC9wXHMZ/AePvJ3Um1xsCpYev7sZA9gZFB0NQ0BpcHzSZPuI4dzoOKmtgZoyr+16akGOZz7G+cKcJJy3iwl2tCRPhdZ9mOV+IrR5pErmr9hwq9363OMeoIk0CQ2PNqJbMXJ0GXrycPbb3Aq00uxilML9JtX/g415blCDhQSAtqH81RJRoBqds8Umay4Wnkx2DgAuVR+E4H4oMACkMREai2PGkDnu7KpesNaXVNpNHAjCK6IKRS3GvjdGEAiaMt8GkuQ3uji96udiSBFbzBebmYHD3ZrBrBHZ7e4IQMwb64F5GE2CT19aJDIRCJ5NeBQNtIoboCHfbeZ7ATnevgT4AcT5hQBl1sJY4UcRYeUKV+ISZ9NJEmvHtFPyrIxS9AHNgobAmDuRXBpfC9xKNlbUe5B2L/wEVsvpPc98ElAAAAABJRU5ErkJggg==" alt="alternatetext" width="24px" /></a>
                <div className="top-h-list">
                  <select id="langus-list">
                    <option>English</option>
                    <option>Dutch</option>
                    <option>Arabic</option>
                    <option>Spanish </option>
                    <option>Chinese</option>
                    <option>Hindi</option>
                  </select>
                </div>
              </div> */}
            </div>

            <div className="knight-icon">
              <a href="#"><img src=" data:image/png;base64,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" alt="alternatetext" width="26px" /></a>
              <p>${cakePriceUsd}</p>
            </div>
            <div className="bnb-icon">
              <a href="#" onClick={handleShow}><img src=" data:image/png;base64,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" alt="alternatetext" width="30px" /></a>
            </div>
          </div>
          <UserBlock account={account} login={login} logout={logout} />
          {profile && <Avatar profile={profile} />}
        </Flex>

      </StyledNav>
      <BodyWrapper>
        <Panel
          isPushed={isPushed}
          isMobile={isMobile}
          showMenu={showMenu}
          isDark={isDark}
          toggleTheme={toggleTheme}
          langs={langs}
          setLang={setLang}
          currentLang={currentLang}
          cakePriceUsd={cakePriceUsd}
          pushNav={setIsPushed}
          links={links}
          priceLink={priceLink}
        />
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
