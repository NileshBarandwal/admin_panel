import React from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-re-super-tabs';
import CustomTab from '../../../components/CustomeTab';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';

const Form = () => (
  <div>
    <Tabs activeTab='about'>
      <TabList>
        <Tab component={CustomTab} label='Basic Details' id='Section1' />
        <Tab component={CustomTab} label='Credit Policy' id='Section2' />
        <Tab component={CustomTab} label='Pricing Policy' id='Section3' />
        <Tab component={CustomTab} label='Account Policy' id='Section4' />
        <Tab component={CustomTab} label='Billing Dashboard' id='Section5' />
      </TabList>
      <TabList>
        <TabPanel component={Section1} id='Section1' />
        <TabPanel component={Section2} id='Section2' />
        <TabPanel component={Section3} id='Section3' />
        <TabPanel component={Section4} id='Section4' />
        <TabPanel component={Section5} id='Section5' />
      </TabList>
    </Tabs>
  </div>
)

export default Form