import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Patient } from '../models/Patient';
import { getAge } from '../util/dates';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'first_name', headerName: 'First name', width: 130 },
    { field: 'last_name', headerName: 'Last name', width: 130 },
    { field: 'sex', headerName: 'Sex', width: 130 },

    {
        field: 'birth',
        headerName: 'Age',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 40,
        valueGetter: (params: GridValueGetterParams) =>
            `${getAge(params.row.birth)}`,
    },
];



export function DataTable(props: { setPatient: (patient: any) => void, patients: Patient[] }) {

    const handleRowClick = (params: any, event: any) => {
        props.setPatient(params.row);
    }

    return (
        <div style={{ width: '100%' }} className=''>

            <DataGrid
                autoHeight
                rows={props.patients}
                className='bg-white'
                columns={columns}
                onRowClick={handleRowClick}

                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}



function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}
