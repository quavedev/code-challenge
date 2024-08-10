import React from 'react';

export function PeoplesByCompany({ peoplesByCompany }) {
  return (
    <div className="max-h-20 overflow-y-auto">
        <div className='ml-8'>
            {peoplesByCompany.map((item) => {
                const companyInfo = `${item.company} (${item.peoples.length})`;

                return <p>{companyInfo}</p>;
            })}
        </div>
    </div>
  );
}
