import React from 'react';
import BreadCrumbs from 'common/breadCrumbs';
import Discounts from 'common/discounts';
import FixedCircle from 'common/fixedCircle';
import MainContainer from 'containers/main-container';
import Section from 'containers/section';
import SectionInner from 'containers/section-inner';
import Vacansies from './vacansies';

const AnalyzePage = () => {
  return (
    <MainContainer>
      <FixedCircle />
      <Section>
        <SectionInner>
          <BreadCrumbs className="vacansies" />
          <Vacansies />
          <Discounts />
        </SectionInner>
      </Section>
    </MainContainer>
  );
};

export default AnalyzePage;
