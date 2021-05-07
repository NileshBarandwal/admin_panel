import React from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-re-super-tabs';
import CustomTab from '../../../components/CustomeTab';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';
import Section7 from './Section7';
import Section8 from './Section8';

const Form = () => (
  <div>
    <Tabs activeTab='about'>
      <TabList>
        <Tab component={CustomTab} label='Home Page' id='Section1' />
        <Tab component={CustomTab} label='Account Setting' id='Section2' />
        <Tab component={CustomTab} label='Role Assignment' id='Section3' />
        <Tab component={CustomTab} label='Billing Dashboard' id='Section4' />
        <Tab component={CustomTab} label='Vendor Settings' id='Section5' />
        <Tab component={CustomTab} label='Price Structure' id='Section6' />
        <Tab component={CustomTab} label='Location Setting' id='Section7' />
        <Tab component={CustomTab} label='Budget Setting' id='Section8' />
      </TabList>
      <TabList>
        <TabPanel component={Section1} id='Section1' />
        <TabPanel component={Section2} id='Section2' />
        <TabPanel component={Section3} id='Section3' />
        <TabPanel component={Section4} id='Section4' />
        <TabPanel component={Section5} id='Section5' />
        <TabPanel component={Section6} id='Section6' />
        <TabPanel component={Section7} id='Section7' />
        <TabPanel component={Section8} id='Section8' />
      </TabList>
    </Tabs>
  </div>
)

export default Form