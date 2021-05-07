import React from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-re-super-tabs';
import CustomTab from '../../../components/CustomeTab';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';

const Form = () => (
  <div>
    <Tabs activeTab='about'>
      <TabList>
        <Tab component={CustomTab} label='Home' id='Section1' />
        <Tab component={CustomTab} label='Manage Customer' id='Section2' />
        <Tab component={CustomTab} label='Bill Center' id='Section3' />
      </TabList>
      <TabList>
        <TabPanel component={Section1} id='Section1' />
        <TabPanel component={Section2} id='Section2' />
        <TabPanel component={Section3} id='Section3' />
      </TabList>
    </Tabs>
  </div>
)

export default Form