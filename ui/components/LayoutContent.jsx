import React, { useState } from 'react';
import { PeopleComponent } from '../../people/ui/PeopleComponent';
import { Divider, Layout } from 'antd';
import CommunitiesComponent from '../../communities/ui/CommunitiesComponent';
import { Summary } from './Summary';
const { Header, Content } = Layout;
import { Texts } from '../../infra/constants';
import styles from './styles.module.css';

//This Component have the Skeleton of the Layot, and share the selected commutiny with the components

export const LayoutContent = () => {
  //state to share selected community to others components
  const [selectedCommunity, setSelectedCommunity] = useState();


  return (
      <Layout className={styles.layout} id="layout">
        <Header className={styles.header}>
          <div className={styles.contentHeader}>
            <img
              src="https://quave.dev/images/logo-quave.svg"
              alt="Logo da Quave"
              />

            <h1>{Texts.HOME_TITLE}</h1>
          </div>
        </Header>
        <Content className={styles.content}>
          <CommunitiesComponent
            handleSelect={setSelectedCommunity}
            />

          {selectedCommunity && (
            <>
              <Summary selectedCommunity={selectedCommunity} />
              <Divider className={styles.divider}/>
              <PeopleComponent selectedCommunity={selectedCommunity} />
            </>
          )}
        </Content>
        {/* <Footer className={styles.footer}>Footer</Footer> */}
      </Layout>
  );
};
