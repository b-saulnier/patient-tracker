import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { supabase } from "../components/AuthBuilder";
import { createContext, useContext } from "react";
import { Patient } from "../models/Patient";



export class DatabaseService {

    async getPatients(): Promise<any> {
        const { data, error } = await supabase.from('patients').select('*');

        return data;
    }

    async getPatient(id: string): Promise<any> {
        const { data, error } = await supabase.from('patients').select('* events()').filter('id', 'eq', id).limit(1).single();

        return data;
    }
    
    async getPatientID(email: string): Promise<any> {
        const { data, error } = await supabase.from('patients').select('*').filter('email', 'eq', email).limit(1).single();
        return data.id;
    }

    async getPrescription(id: string): Promise<any> {
        // the type from the filter is incorrect, and believes that medications is an
        // array, rather than a single object. We must ignore its type signature unfortunately
        const { data, error } = await supabase
            .from('prescriptions')
            .select('start_date, medications!inner(name), diagnoses!inner(events!inner(patients!inner(*)))')
            .filter('diagnoses.events.patients.id', 'eq', id);

        // @ts-ignore
        return data?.map((e, idx) => ({name: e.medications.name, key: idx, prescribedOn: e.start_date}));             
    }

    async getPatientData(id: string): Promise<any> {
        const { data, error } = await supabase.from('patients').select('*, events ( *, diagnoses ( *, illness:illness_id ( * ), prescriptions (*,medication:medication_id(*)) ) )').filter('id', 'eq', id).limit(1).single();
        console.log(data);
        return data;
    }

    async getUpcomingEvents(id: string): Promise<any> {
        const { data, error } = await supabase.from('event_doctor_view')
            .select('*')
            .filter('patient_id', 'eq', id)
            // .filter('start_date', 'gte', new Date())
            // .order('start_date', { ascending: true })
            // .limit(10);

        // filter on Date
        const today = new Date();
        const filteredData = (data == null)? null : data.filter((e: any) => {
            console.log(e);
            return new Date(e.end_time) >= today;
        });

        console.log("getUpcomingEvents", filteredData);
        return filteredData;
    }

    async getVisit(id: string): Promise<any> {
        const { data, error } = await supabase.from('events').select('*, diagnoses ( *, illness:illness_id ( * ), prescriptions (*,medication:medication_id(*)) ) ').filter('id', 'eq', id).limit(1).single();
        return data;
    }
    async getVisits(): Promise<any> {
        const { data, error } = await supabase.from('events').select('*, patient:patient_id(*), diagnoses ( *, illness:illness_id ( * ), prescriptions (*,medication:medication_id(*)) ) ');
        return data;
    }


    async getMedications(): Promise<any> {
        const { data, error } = await supabase.from('medications').select('*');

        return data;
    }

    async getIllnesses(): Promise<any> {
        const { data, error } = await supabase.from('illnesses').select('*');

        return data;
    }


}

const service = new DatabaseService();

const authServiceContext = createContext<DatabaseService>(service);

export function usePatientService() {
    return useContext(authServiceContext);
}



export function PatientServiceProvider(props: any) {



    return (<authServiceContext.Provider value={service}>

        {props.children}
    </authServiceContext.Provider>)

}



