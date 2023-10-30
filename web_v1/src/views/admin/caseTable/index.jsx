import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

const OfficersTable = () => {
  const [station, setStation] = useState("choose");
  const [filter, setFilter] = useState("filter");
  const [search, setSearch] = useState("");
  const { stations, caseDetail } = useSelector((state) => state.caseData);
  const [filteredData, setFilteredData] = useState([]);
  const [standardFilteredData, setStandardFilteredData] = useState([]);

  function sortCasesInAscending(cases, hearing) {
    return cases.sort((a, b) => {
      const aDates = a.map((caseData) => new Date(caseData[hearing].date));
      const bDates = b.map((caseData) => new Date(caseData[hearing].date));

      const minADate = Math.min(...aDates);
      const minBDate = Math.min(...bDates);

      return minADate - minBDate;
    });
  }

  function findCaseByCrimeNo(caseList, crimeName) {
    for (const cases of caseList) {
      Object.entries(cases).map(([key, value]) => {
        if (key.toLowerCase() === crimeName.toLowerCase()) {
          return cases;
        }
      }
      )
    }
    return null;
  }

  useEffect(() => {
    const _filteredData = [];
    if (station != "choose") {
      Array.from(caseDetail).find((station) => {
        Object.entries(station).map((value, index) => {
          Array.from(value[1]).map((val) => {
            _filteredData.push(val);
          })
        });
      })
    }
    setFilteredData(_filteredData);
    setStandardFilteredData(_filteredData);
  }, [station])

  useEffect(() => {
    if (filter != "filter") {
      const d = sortCasesInAscending(filteredData, filter);
      setFilteredData(d);
    } else {
      setFilteredData(standardFilteredData);
    }
  }, [filter])

  useEffect(() => {
    if (search != "") {
      const d = findCaseByCrimeNo(filteredData, search);
      if (d != null) { setFilteredData(d); }
    } else {
      setFilteredData(standardFilteredData);
    }
  }, [search])

  return (
    <>
      <section className="p-3 sm:p-5 antialiased">
        <div className="mt-2">
          <div className="bg-white dark:bg-navy-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <select value={station} onChange={(event) => setStation(event.target.value)} className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <option value="choose">Choose a station</option>
                    {Array.from(stations).map((value) => {
                      return <option value={value} key={value}>{value}</option>;
                    })}
                  </select>
                  <select value={filter} onChange={(event) => setFilter(event.target.value)} className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <option value="filter">
                      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewbox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                      </svg>
                      Filter
                      <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </option>
                    <option value="lastHearing">Last Hearing</option>
                    <option value="nextHearing">Next Hearing</option>
                  </select>

                  <div id="filterDropdown" className="z-10 hidden w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Category</h6>
                    <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                      <li className="flex items-center">
                        <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                        <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                      </li>
                    </ul>
                  </div>
                  <button type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    Export
                  </button>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input type="text" onChange={(event) => setSearch(event.target.value)} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search with case no" />
                </div>
              </div>
            </div>


            <div className="overflow-x-auto">

              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-4">Case NO</th>
                    <th scope="col" className="px-4 py-3">Crime NO</th>
                    <th scope="col" className="px-4 py-3">Accused</th>
                    <th scope="col" className="px-4 py-3">Court</th>
                    <th scope="col" className="px-4 py-3">Last Hearing</th>
                    <th scope="col" className="px-4 py-3">Next Hearing</th>
                    <th scope="col" className="px-4 py-3">Stage</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.map((value, index) => (
                    Object.entries(value).map(([key, data]) => {
                      var crimeNOString = Array.from(data.crimeNo).map((value, index) => (value + (index == data.crimeNo.length - 1 ? "" : ", ")));
                      var accusedString = Array.from(data.accused).map((value, index) => (value + (index == data.accused.length - 1 ? "" : ", ")));
                      var court = `${data.court.type} : ${data.court.value}`;
                      var lastHearingDate = data.lastHearing.date;
                      var lastHearingReason = data.lastHearing.reason;
                      var nextHearingDate = data.nextHearing.date;
                      var nextHearingReason = data.nextHearing.reason;
                      var stage = data.stage;

                      return <tr key={data} className="border-b dark:border-gray-700">
                        <th scope="row" className="min-w-[6rem] px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{key}</th>
                        <td className="px-4 py-3 min-w-[6rem]">{crimeNOString}</td>
                        <td className="px-4 py-3 max-w-[8rem]">{accusedString}</td>
                        <td className="px-4 py-3 ">{court}</td>
                        <td className="px-4 py-3 min-w-[10rem] max-w-[12rem] overflow-x-scroll"><span className=" font-semibold text-gray-700">{lastHearingDate} : </span>{lastHearingReason}</td>
                        <td className="px-4 py-3 min-w-[10rem] max-w-[12rem] overflow-x-scroll"><span className=" font-semibold text-gray-700">{nextHearingDate} : </span>{nextHearingReason}</td>
                        <td className="px-4 py-3">{stage}</td>
                      </tr>;
                    })
                  )
                  )}
                </tbody>
              </table>
            </div>
            {/* <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white"> 1-10 </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white"> 1000 </span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Previous</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                </li>
                <li>
                  <a href="#" aria-current="page" className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                </li>
                <li>
                  <a href="#" className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span className="sr-only">Next</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav> */}
          </div>
        </div>
      </section>

    </>
  );
};

export default OfficersTable;




