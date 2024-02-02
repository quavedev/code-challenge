import React from 'react'
import {  Select, Space } from 'antd'
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'
import { Communities } from '../communities';
import { useSummary } from '../../ui/contexts/SummaryContext';

export default function CommunitiesComponent({ handleSelect }) {
  const { dispatchSummary } = useSummary();

  const onChange = (value) => {
    handleSelect(value);
    dispatchSummary({
      type: 'add-community',
      communityId: value
    })
  };

  const {
    communities,
    isLoadingCommunities: isLoadingCommun,
  } = useTracker(() => {
    try {
      const communitiesHandle = Meteor.subscribe('communities');
      const isLoadingCommunities = !communitiesHandle.ready();

    const communities = Communities.find().fetch();
    return { communities, isLoadingCommunities, error: null };
  } catch (error) {
    console.log(error)

    return { communities: [], isLoadingCommunities: false, error };
  }
});
  
  // Filter option.label match the user type 'input'
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <Space size="middle">
      
      <h2>Select an Event:</h2>
     
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onChange}
        filterOption={filterOption}
        options={communities.map(({_id, name}) => {
          return {
            label: name,
            value: _id
          }
        })}
        loading={isLoadingCommun}
      />
      
  </Space>
  )
}
