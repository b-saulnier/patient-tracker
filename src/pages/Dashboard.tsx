import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { MainLayout } from '../components/MainLayout';
import { Event } from '../models/Event';
import { EventsSchedule } from '../components/EventsSchedule';
import { useState, useEffect } from 'react';
import { usePatientService } from '../services/Patient';





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

export function DashboardPage(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string | null>(null);


    

    const service = usePatientService();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    useEffect(
    () => {
        if (loading) {
            service.getLoggedInPatient().then((patient) => {
                setUserId(patient);                
                service.getUpcomingEvents(patient!).then((events) => {
                    setEvents(events);
                    console.log("events", events);
                    setLoading(false);
                });
                
            });
        }
    }, []
    );

    



    return loading ? <>Loading...</> : 
        <>
            <EventsSchedule events={events!}/>
        </>;

}




