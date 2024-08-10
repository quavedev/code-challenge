import React from 'react';

export function PeoplesByCompany({ peoplesByCompany }) {
  return (
    <div className="scrollbar-hide ml-8 max-h-32 overflow-y-scroll">
      <div className="ml-8">
        {peoplesByCompany.map((item) => {
          const companyInfo = `${item.company} (${item.peoples.length})`;

          return <p key={item.index}>{companyInfo}</p>;
        })}
      </div>
    </div>
  );
}
