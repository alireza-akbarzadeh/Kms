import React  from "react";
import { Kms, Wrapper } from "./Layout-Styled";
import { Sidebar } from "components";
import HeaderLayout from "./HeaderLayout";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/features/users/userSlice";

const Layout = ({ children }) => {
  const { data, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <Kms id="kms-layout">
      <Wrapper>
        <Sidebar data={data} loading={loading} />
        <MainWrapper id="kms-main">
          <HeaderLayout data={data} loading={loading} />
          {children}
        </MainWrapper>
      </Wrapper>
    </Kms>
  );
};

export default Layout;

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 100vh;
  min-width: 0;
  position: relative;
  z-index: 10;
`;
