import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

import Table, {SelectColumnFilter} from './Table'


// https://github.com/jimmybutton/react-tailwind-table


const App = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/data');
      const parsedData = Papa.parse(response.data, { header: true }).data;
      const parsedColumns = Object.keys(parsedData[0]).map((key) => ({
        Header: key,
        accessor: key,


        // TODO uncomment to filter
        // Filter: SelectColumnFilter,  // new
        // filter: 'includes',  // new
      }));


      /*

      example


          const columns = React.useMemo(() => [
    {
      Header: "Name",
      accessor: 'name',
      Cell: AvatarCell,
      imgAccessor: "imgUrl",
      emailAccessor: "email",
    },
    {
      Header: "Title",
      accessor: 'title',
    },
    {
      Header: "Status",
      accessor: 'status',
      Cell: StatusPill,
    },
    {
      Header: "Age",
      accessor: 'age',
    },
    {
      Header: "Role",
      accessor: 'role',
      Filter: SelectColumnFilter,  // new
      filter: 'includes',
    },
  ], [])
      */

      setTableData(parsedData);
      setColumns(parsedColumns);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">포항 맛집 리스트</h1>
        </div>
        <div className="mt-4">
          <Table columns={columns} data={tableData} />
        </div>
      </main>
    </div>
  );

};

export default App;
