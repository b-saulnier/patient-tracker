import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MedicationIcon from '@mui/icons-material/Medication';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import { Patient } from '../models/Patient';
import { Event } from '../models/Event';
import { PrescriptionBox, Prescription } from '../components/PrescriptionBox'
import { supabase } from '../components/AuthBuilder';
import { DatabaseService } from '../services/Patient'
import { EventsSchedule } from '../components/EventsSchedule';
import { CircularProgress } from '@mui/material';
const drawerWidth = 200;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

interface Links {
    name: string;
    url: string;
    icon: React.ReactElement
}

const sampleEvents = [
    {
        id: 1,
        patient_id: 1,
        start_time: '2021-10-01T10:00:00',
        end_time: '2021-10-01T11:00:00',
        type: 'Appointment',
        doctor_id: 1,
        first_name: 'Sarah',
        last_name: 'Surgeon',
    } as Event,
    {
        id: 2,
        patient_id: 2,
        start_time: '2021-10-02T10:00:00',
        end_time: '2021-10-02T11:00:00',
        type: 'Random',
        doctor_id: 2,
        first_name: 'Daniel',
        last_name: 'Doctor',
    } as Event,
    {
        id: 3,
        patient_id: 3,
        start_time: '2021-10-03T10:00:00',
        end_time: '2021-10-03T13:00:00',
        type: 'Misc.',
        doctor_id: 3,
        first_name: 'Phyllis',
        last_name: 'Physician',
    } as Event,
];

export function DashboardPage(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isRendered, setIsRendered] = React.useState(false);
    const [isDoctor, setIsDoctor] = React.useState(false);
    const [userPrescriptions, setUserPrescriptions] = React.useState([]);
    const [events, setEvents] = React.useState<Event[]>([]);

    React.useEffect(() => {
        console.log('hello????');
        const fetchData = async() => {
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser();
                // default to patient if user is undefined
                setIsDoctor(!!user?.email?.endsWith('health.gov') ?? false);
                // console.log(user);
                var patient_id = await serivce.getPatientID(user?.email!);
                setUserPrescriptions(await serivce.getPrescription(patient_id));
            } catch (error) {
                console.log('error :( ' + error);
            }
        };
        var serivce = new DatabaseService();
        
        // console.log(data);
        fetchData();
        setIsRendered(true);
    }, []);

    React.useEffect(() => {
        setEvents(sampleEvents);
        console.log("set events");
    }, []);
    
    // return !isRendered ? 
    //         <div>Rendering!</div> :
    //         isDoctor ? 
    //             <div>I am a doctor!</div> :
    //             <>
    //                 <Box sx={{ margin:'20px', display:'flex', width:'100%'}}>
    //                     <PrescriptionBox prescriptions={ userPrescriptions }/>
    //                 </Box>;

    //                 <EventsSchedule events={events}/>
    //             </>

    return <>
        <div className="p-8 h-screen w-full">
            <div>
                <h1 className='text-2xl font-semibold'>Dashboard</h1>
                <div className='border-b border-gray-300 w-full mb-8 mt-4' />
            </div>
            {!isRendered ? 
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                : 
                <>
                    <Box sx={{ margin:'20px', display:'flex', width:'100%'}}>
                        <PrescriptionBox prescriptions={ userPrescriptions }/>
                    </Box>

                    <EventsSchedule events={events!}/>
                </>
            }
        </div>;
    </>
                
}
