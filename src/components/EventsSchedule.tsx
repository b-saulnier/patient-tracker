import { Event } from '../models/Event';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import { getDayString, getTimeOfDay } from '../util/dates';


export function EventsSchedule(props: { events: Event[] }) {

    return (<div className='p-12 w-full'>

            <div className='  border border-gray-200 rounded-lg w-full p-4 bg-white mt-8 '>
                <div className='flex flex-row gap-8 border-b border-gray-300 mb-4 pb-3 items-center '>
                    <h1 className='text-xl font-semibold '>
                        Upcoming Appointments
                    </h1>
                </div>

                <>
                    {props.events.map((event) => {
                        return <>
                            <Timeline
                                sx={{
                                    [`& .${timelineItemClasses.root}:before`]: {
                                        flex: 0,
                                        padding: 0,
                                    },
                                }}
                            >

                                <TimelineItem>


                                    <TimelineSeparator>
                                        <TimelineDot variant="outlined" />
                                        <TimelineConnector />
                                    </TimelineSeparator>

                                    <TimelineContent> 
                                    <div className='font-semibold'>
                                        {event.type}
                                    </div>
                                    <div className='font-medium'>
                                        {getDayString(new Date(event.start_time))} | { getTimeOfDay(new Date(event.start_time))} - {getTimeOfDay(new Date(event.end_time))}
                                    </div>
                                    <div className='font-normal'>
                                        Dr. {event.first_name} {event.last_name}
                                    </div>
                                    </TimelineContent>
                                </TimelineItem>
                            </Timeline>
                        </>
                    })}
                </>


            </div>
        </div>
    );
}
