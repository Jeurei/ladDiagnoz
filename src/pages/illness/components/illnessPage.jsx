import React from 'react';
import BreadCrumbs from 'common/breadCrumbs';
import FixedCircle from 'common/fixedCircle';
import MainContainer from 'containers/main-container';
import Section from 'containers/section';
import SectionInner from 'containers/section-inner';
import Illnes from './illness';

const SpacialityPage = () => {
  return (
    <MainContainer>
      <FixedCircle />
      <Section>
        <SectionInner>
          <BreadCrumbs className="illnes" />
          <Illnes />
        </SectionInner>
      </Section>
    </MainContainer>
  );
};

export default SpacialityPage;
