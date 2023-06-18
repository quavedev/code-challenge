import React, { useState } from 'react';

export const Summary = ({
  summaryCalculation: summary,
  peopleCompanyArray: peopleByCompanyArray,
}) => {
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  return (
    <div className="mt-4 h-auto w-80 rounded-xl p-4 bg-green-500">
      <h1 className="text-center font-bold text-4xl">Summary</h1>
      <div className="box_li flex items-center justify-center mt-6">
        <ul className=" text-xl my-2.5 list-none">
          <li className="max-w-15rem">
            People in the event right now: {summary.peopleInEvent}
          </li>
          <li className="break-all max-w-15rem">
            People by company in the event right now:{' '}
            {/* formatting to desired pattern */}
            {showAllCompanies
              ? peopleByCompanyArray.map(([company, count], index) => (
                  <span key={company}>
                    {company} ({count})
                    {index !==
                      Object.entries(summary.peopleByCompany).length - 1 &&
                      ', '}
                  </span>
                ))
              : peopleByCompanyArray
                  .slice(0, 5)
                  .map(([company, count], index) => (
                    <span key={company}>
                      {company} ({count}){index !== 4 && ', '}
                    </span>
                  ))}
            {peopleByCompanyArray.length > 5 ? (
              <button
                className=" text-blue-800"
                onClick={() => setShowAllCompanies(!showAllCompanies)}
              >
                {showAllCompanies ? 'Show less' : 'Show more...'}
              </button>
            ) : null}
          </li>
          <li className="max-w-15rem">
            People not checked-in: {summary.uncheckedPeople}
          </li>
        </ul>
      </div>
    </div>
  );
};
