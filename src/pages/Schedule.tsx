import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
    MonthView,
    DateNavigator,
    TodayButton,
    Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Patient } from '../models/Patient';
import { usePatientService } from '../services/Patient';
import { Visit } from '../models/Visit';
import { capitalize } from '@mui/material';

export function SchedulePage(props: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [visits, setVisits] = useState<Visit[]>([]); // [1
    const service = usePatientService();
    const navigate = useNavigate();

    const handleSetPatient = (patient: Patient) => {
        navigate("/patients/" + patient.id);

    }
    useEffect(
        () => {
            if (loading) {
                service.getVisits().then((visits) => {
                    setVisits(visits);
                    setLoading(false);
                });
            }


        }
    );
    const events = visits.map((v) => {
        return {
            startDate: v.start_time,
            endDate: v.end_time,
            title: v.patient.first_name + " " + v.patient.last_name + " | " + capitalize(v.type),
        }
    });
    return <div className='h-screen p-8'>
        <div>
            <h1 className='text-2xl font-semibold'>Schedule</h1>
            <div className='border-b border-gray-300 w-full mb-8 mt-4' />
        </div>
        <div className='border border-gray-300 rounded-lg p-1 bg-white'>

            {
                <Scheduler
                    data={events}
                >
                    <ViewState
                        defaultCurrentDate={new Date()}
                    />
                    <MonthView

                    />
                    <Toolbar />

                    <DateNavigator />
                    <TodayButton />
                    <Appointments />
                </Scheduler>
            }
        </div>
    </div>;

}

