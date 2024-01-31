import React, { useState } from 'react';
import { PeopleComponent } from '../../people/ui/PeopleComponent';
import { Divider, Layout } from 'antd';
import CommunitiesComponent from '../../communities/ui/CommunitiesComponent';
import Summary from './Summary';
const { Header, Footer, Content } = Layout;
import styles from './styles.module.css';

//This Component have the Skeleton of the Layot, and share the selected commutiny with the components

export const LayoutContent = () => {
  const [selectedCommunity, setSelectedCommunity] = useState();


  return (
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <div>
            <img
              src="https://quave.dev/images/logo-quave.svg"
              alt="Logo da Quave"
              />
          </div>
        </Header>
        <Content className={styles.content}>
          <CommunitiesComponent
            handleSelect={setSelectedCommunity}
            />

          <Summary />
          {selectedCommunity && (
            <>
              <Divider className={styles.divider}/>
              <PeopleComponent selectedCommunity={selectedCommunity} />
            </>
          )}
        </Content>
        <Footer className={styles.footer}>Footer</Footer>
      </Layout>
  );
};
